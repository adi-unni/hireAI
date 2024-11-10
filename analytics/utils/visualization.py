import plotly.express as px
import plotly.graph_objects as go

class Visualizer:
    @staticmethod
    def create_topic_distribution_chart(topic_dist):
        fig = px.pie(
            values=list(topic_dist.values()),
            names=list(topic_dist.keys()),
            title='Topic Distribution'
        )
        return fig
    
    @staticmethod
    def create_engagement_timeline(df):
        fig = px.line(
            df,
            x='timestamp',
            y='engagement_score',
            title='Engagement Score Timeline'
        )
        return fig 