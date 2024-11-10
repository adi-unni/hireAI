import 'dotenv/config';
import { OpenAI } from '@langchain/openai';
import fs from 'fs';
import express from 'express';
import cors from 'cors';

// Read API key from environment variable
const apiKey = process.env.OPENAI_API_KEY;

//Noww start the express server so that we can use it as an API to communicate with the frontend
const app = express();
app.use(express.json());
app.use(cors());

// Initialize the OpenAI LLM with your API key
const llm = new OpenAI({
  openAIApiKey: apiKey,
  modelName: 'gpt-4o-mini',
});

let response = '';
let questions = [];
let score = '';
let user_asked_questions = [];

const historicalTopics = [
    "The Fall of the Roman Empire",
    "The Industrial Revolution",
    "The Renaissance Period",
    "The French Revolution",
    "The American Civil War",
    "The Age of Exploration",
    "The Scientific Revolution",
    "The Rise and Fall of Ancient Egypt",
    "The Silk Road Trade Routes",
    "The Medieval Crusades"
];

function getRandomTopic() {
    const randomIndex = Math.floor(Math.random() * historicalTopics.length);
    const selectedTopic = historicalTopics[randomIndex];
    return selectedTopic;   
}


// Convert to async function to handle content generation
async function generateContent() {
    const topic = getRandomTopic();
    response = await llm.call(`Create a concise yet informative overview on the topic of "${topic}". The response should provide a well-rounded understanding, covering the key aspects of the subject while remaining succinct. Include relevant historical examples throught out the human history and brief annotations that illustrate these points effectively. Ensure that the tone is educational and engages readers with clarity and precision, aiming for a response within (desired word count, e.g., 80-100 words).`);
    const questionsString = await llm.call(`Generate 8 True/False questions based on the "${topic}". The questions should test the reader's comprehension and analytical thinking by exploring inferences, implications, or related facts. Ensure that the questions are not direct statements from the content but are logically derived from the information provided. Format each question clearly, using the following template for consistency:

    Q1: [True/False question statement]
    Q2: [True/False question statement]
    Q3: [True/False question statement]

Ensure that each question and answer pair is formatted in this way to facilitate easy review and parsing. Content is : ${response}`);
    
    // Parse the questions string into an array
    questions = questionsString.split(/Q\d+:\s+/)  // Split by "Q1: ", "Q2: ", etc.
        .filter(q => q.trim())  // Remove empty strings
        .map((question, index) => ({
            id: index + 1,
            question: question.trim()
        }));
        
    return { content: response, questions: questions };
}

// API Endpoints
app.get('/generate', async (req, res) => {
    try {
        const result = await generateContent();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/answer', async (req, res) => {
    try {
        const { question } = req.body;
        user_asked_questions.push(question);
        const answer = await llm.call(`You are assisting a user with understanding the following content: ${response}. 
            Please answer their questions only within the context of the content. 
            Do not provide direct answers to any quiz questions. 
            Here is the user query: ${question}. 
            Please only provide the answer to the question and nothing else. Keep it below 100 words.`);
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function parseScoreResponse(scoreText) {
    const lines = scoreText.split('\n');
    const questions = [];
    let currentQuestion = {};
    let overallScore = '';
    let overallFeedback = '';

    for (const line of lines) {
        if (line.startsWith('Question: ')) {
            if (Object.keys(currentQuestion).length > 0) {
                questions.push(currentQuestion);
                currentQuestion = {};
            }
            currentQuestion.question = line.replace('Question: ', '');
        } else if (line.startsWith('Answer Submitted: ')) {
            currentQuestion.submitted = line.replace('Answer Submitted: ', '');
        } else if (line.startsWith('Correct Answer: ')) {
            currentQuestion.correct = line.replace('Correct Answer: ', '');
        } else if (line.startsWith('Feedback: ')) {
            currentQuestion.feedback = line.replace('Feedback: ', '');
        } else if (line.startsWith('Overall Score: ')) {
            overallScore = line.replace('Overall Score: ', '');
        } else if (overallScore && line.trim() && !line.startsWith('Question: ')) {
            overallFeedback = line.trim();
        }
    }
    
    // Push the last question
    if (Object.keys(currentQuestion).length > 0) {
        questions.push(currentQuestion);
    }

    return {
        questions,
        overall: {
            score: overallScore,
            feedback: overallFeedback
        }
    };
}

app.post('/score', async (req, res) => {
    try {
        const { answers } = req.body;
        const scoreText = await llm.call(`Here are the user's answers: 
          ${answers} 
          to the quiz questions mentioned below: ${questions.map(q => q.question).join(', ')} based on the content: ${response}. Give the user a score out of 3 based on their answers and give detailed feedback on their performance. Please keep the order of the questions in mind. Please keep the format for each question as:
          Question: [Question]
          Answer Submitted: [User's Answer]
          Correct Answer: [Correct Answer]
          Feedback: [Feedback]`);
        
        score = parseScoreResponse(scoreText);
        res.json({ score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/generate_report', async (req, res) => {
    try {
        const report = await llm.call(`Here is the content: ${response}. 
            Here are the questions that the user asked: ${user_asked_questions}. 
            Here is the feedback that the user got from the quiz: ${score}. 
            Generate a very detailed psychometric report of 450 words for the user based on the above information.`);
        
        res.json({
            quiz_score: score,  // The original quiz feedback
            user_questions: user_asked_questions,  // Questions asked during the session
            psychometric_report: report,  // The generated psychometric report
            content: response  // Original content that was presented
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});