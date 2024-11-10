import streamlit as st

class ReportSections:
    @staticmethod
    def render_introduction(metrics):
        st.header("1. Introduction")
        st.write("Event Summary: Analysis of candidate interactions and responses")
        st.metric("Total Conversations", metrics['total_conversations'])
        st.metric("Average Response Time", f"{metrics['avg_response_time']:.2f}s")

    @staticmethod
    def render_engagement_analysis(df, visualizer):
        st.header("2. Engagement Analysis")
        
        # Display engagement timeline
        engagement_chart = visualizer.create_engagement_timeline(df)
        st.plotly_chart(engagement_chart)
        
        # Topic distribution
        topic_chart = visualizer.create_topic_distribution_chart(
            df['topic'].value_counts().to_dict()
        )
        st.plotly_chart(topic_chart) 