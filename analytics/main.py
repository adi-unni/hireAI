import streamlit as st
import plotly.express as px
import pandas as pd
from utils.data_processor import DataProcessor


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
    st.header("4. Topic Distribution")
    topic_dist = pd.Series(metrics['topic_distribution'])
    fig_topics = px.pie(values=topic_dist.values,
                       names=topic_dist.index,
                       title='Topic Distribution')
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

if __name__ == "__main__":
    main() 