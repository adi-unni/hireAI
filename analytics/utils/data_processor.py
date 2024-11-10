import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class DataProcessor:
    def __init__(self):
        pass

    def fetch_conversation_data(self):
        # Sample hardcoded data
        dates = pd.date_range(start='2024-01-01', end='2024-03-15', freq='D')
        
        conversations = []
        for date in dates:
            conversations.append({
                'timestamp': date,
                'topic': np.random.choice(['History', 'Politics', 'Economics', 'Technology']),
                'engagement_score': np.random.normal(85, 10),
                'response_time': np.random.normal(30, 5),
                'question_quality': np.random.normal(88, 5)
            })
        
        return conversations
    
    def process_conversations(self, conversations):
        # Convert to DataFrame
        df = pd.DataFrame(conversations)
        
        # Calculate metrics
        metrics = {
            'total_conversations': len(df),
            'avg_response_time': df['response_time'].mean(),
            'avg_engagement': df['engagement_score'].mean(),
            'topic_distribution': df['topic'].value_counts().to_dict(),
            'engagement_scores': df['engagement_score'].describe().to_dict()
        }
        
        return df, metrics