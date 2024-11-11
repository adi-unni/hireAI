import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os

class DataProcessor:
    def __init__(self):
        self.test_results_file = 'test_results.json'
        # Create the file if it doesn't exist
        if not os.path.exists(self.test_results_file):
            with open(self.test_results_file, 'w') as f:
                json.dump([], f)

    def store_test_results(self, test_data):
        """Store test results in a JSON file"""
        try:
            # Read existing data
            with open(self.test_results_file, 'r') as f:
                existing_data = json.load(f)
            
            # Append new data
            existing_data.append(test_data)
            
            # Write back to file
            with open(self.test_results_file, 'w') as f:
                json.dump(existing_data, f)
                
        except Exception as e:
            print(f"Error storing test results: {e}")

    def fetch_latest_test(self):
        """Fetch the most recent test results"""
        try:
            with open(self.test_results_file, 'r') as f:
                test_results = json.load(f)
                
            if test_results:
                # Return the most recent test (last item in the list)
                return test_results[-1]
            return None
            
        except Exception as e:
            print(f"Error fetching test results: {e}")
            return None

    def fetch_conversation_data(self):
        # Define prompt quality metrics
        prompt_categories = [
            'Historical Context Questions',
            'Analytical Questions',
            'Clarification Questions',
            'Follow-up Questions'
        ]
        
        prompt_quality_metrics = {
            'Historical Context Questions': {
                'relevance': (70, 95),  # (min, max) range for random normal distribution
                'specificity': (75, 90),
                'depth': (80, 95)
            },
            'Analytical Questions': {
                'relevance': (75, 95),
                'specificity': (80, 95),
                'depth': (85, 98)
            },
            'Clarification Questions': {
                'relevance': (60, 85),
                'specificity': (70, 90),
                'depth': (65, 85)
            },
            'Follow-up Questions': {
                'relevance': (75, 90),
                'specificity': (70, 85),
                'depth': (75, 90)
            }
        }

        dates = pd.date_range(start='2024-01-01', end='2024-03-15', freq='D')
        
        conversations = []
        for date in dates:
            category = np.random.choice(prompt_categories)
            metrics = prompt_quality_metrics[category]
            
            conversations.append({
                'timestamp': date,
                'prompt_category': category,
                'relevance_score': np.random.normal(
                    (metrics['relevance'][0] + metrics['relevance'][1]) / 2,
                    5
                ),
                'specificity_score': np.random.normal(
                    (metrics['specificity'][0] + metrics['specificity'][1]) / 2,
                    5
                ),
                'depth_score': np.random.normal(
                    (metrics['depth'][0] + metrics['depth'][1]) / 2,
                    5
                ),
                'overall_quality': np.random.normal(85, 5),
                'response_time': np.random.normal(30, 5)
            })
        
        return conversations
    
    def process_conversations(self, conversations):
        # Convert to DataFrame
        df = pd.DataFrame(conversations)
        
        # Add week number column
        df['week'] = df['timestamp'].apply(lambda x: x.isocalendar()[1])
        
        # Calculate engagement score
        df['engagement_score'] = (
            df['relevance_score'] + 
            df['specificity_score'] + 
            df['depth_score'] + 
            df['overall_quality']
        ) / 4
        
        # Calculate metrics
        metrics = {
            'total_conversations': len(df),
            'avg_response_time': df['response_time'].mean(),
            'avg_engagement': df['engagement_score'].mean(),
            'prompt_quality': {
                'avg_relevance': df['relevance_score'].mean(),
                'avg_specificity': df['specificity_score'].mean(),
                'avg_depth': df['depth_score'].mean(),
                'avg_overall': df['overall_quality'].mean()
            },
            'topic_distribution': df['prompt_category'].value_counts().to_dict(),
            'quality_trends': {
                'relevance': df.groupby('week')['relevance_score'].mean().to_dict(),
                'specificity': df.groupby('week')['specificity_score'].mean().to_dict(),
                'depth': df.groupby('week')['depth_score'].mean().to_dict()
            }
        }
        
        return df, metrics