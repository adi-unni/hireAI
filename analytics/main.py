import streamlit as st
import plotly.express as px
import pandas as pd
from utils.data_processor import DataProcessor
from datetime import datetime, timedelta


def main():
    st.set_page_config(page_title="Candidate Analysis Report", layout="wide")
    
    # Title and Introduction
    st.title("Candidate Analysis Report")
    
    # Initialize data processor
    data_processor = DataProcessor()
    
    # Fetch and process data
    conversations = data_processor.fetch_conversation_data()
    df, metrics = data_processor.process_conversations(conversations)
    
    # 1. Introduction
    st.header("1. Introduction")
    col1, col2 = st.columns(2)
    with col1:
        st.subheader("Event Summary")
        st.write("""
        The candidate was presented with the topic of the Berlin Wall's fall 
        and engaged by asking questions to explore its causes, reactions, and global impact.
        """)
    with col2:
        st.subheader("Assessment Objective")
        st.write("Evaluate the candidate's understanding, analytical approach, and recall.")

    # 2. Performance Metrics
    st.header("2. Performance Metrics")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Average Engagement Score", f"{metrics['avg_engagement']:.1f}%")
    with col2:
        st.metric("Average Response Time", f"{metrics['avg_response_time']:.1f}s")
    with col3:
        st.metric("Total Interactions", metrics['total_conversations'])

    # 3. Engagement Timeline
    st.header("3. Engagement Analysis")
    fig_timeline = px.line(df, 
                          x='timestamp', 
                          y='engagement_score',
                          title='Engagement Score Timeline')
    st.plotly_chart(fig_timeline, use_container_width=True)

    # 4. Topic Distribution
    st.header("4. Question Category Distribution")
    topic_dist = pd.Series(metrics['category_distribution'])
    fig_topics = px.bar(
        x=topic_dist.index,
        y=topic_dist.values,
        labels={'x': 'Question Category', 'y': 'Count'},
        title='Distribution of Question Categories'
    )
    st.plotly_chart(fig_topics)

    # 5. Detailed Assessment
    st.header("5. Detailed Assessment")
    scores = {
        'Category': ['General Knowledge', 'Communication', 'Reasoning', 'Higher-Order Thinking'],
        'Score': [90, 85, 88, 80],
        'Comments': [
            'Strong factual recall with accurate responses',
            'Clear, logical questions and effective summarization',
            'Strong logical progression in questions',
            'Good insight, could explore more unique perspectives'
        ]
    }
    df_scores = pd.DataFrame(scores)
    st.table(df_scores)

    # 6. Latest Test Results
    st.header("6. Latest Test Results")
    
    # Fetch the most recent test results
    latest_test = data_processor.fetch_latest_test()
    
    if latest_test:
        st.subheader("Test Summary")
        
        # Display test timestamp
        st.write(f"Test completed: {latest_test['timestamp']}")
        
        # Create a DataFrame for the test results
        test_df = pd.DataFrame({
            'Question': latest_test['questions'],
            'Answer': latest_test['answers']
        })
        
        # Display results in a table
        st.table(test_df)
        
        # Calculate and display score
        correct_answers = len([a for a in latest_test['answers'] if a == 'True'])
        total_questions = len(latest_test['questions'])
        score = (correct_answers / total_questions) * 100
        
        st.metric("Test Score", f"{score:.1f}%")
    else:
        st.subheader("Sample Test Results")
        
        # Create sample test data
        sample_test = {
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'questions': [
                "Q1",
                "Q2",
                "Q3",
                "Q4",
                "Q5",
                "Q6",
                "Q7",
                "Q8"
            ],
            'answers': [
                'True',
                'False',
                'False',
                'True',
                'False',
                'True',
                'False',
                'True'
            ]
        }
        
        st.write(f"Test completed: {sample_test['timestamp']}")
        
        # Create a DataFrame for the sample test results
        sample_df = pd.DataFrame({
            'Question': sample_test['questions'],
            'Answer': sample_test['answers']
        })
        
        # Display sample results in a table
        st.table(sample_df)
        
        # Calculate and display sample score
        correct_sample = len([a for a in sample_test['answers'] if a == 'True'])
        total_sample = len(sample_test['questions'])
        sample_score = (correct_sample / total_sample) * 100
        
        st.metric("Sample Test Score", f"{sample_score:.1f}%")
        
        # st.info("⚠️ This is sample data. Real test results will appear here after completing an assessment.")

if __name__ == "__main__":
    main() 