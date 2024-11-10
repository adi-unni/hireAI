import os
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:1573/api')
STREAMLIT_PORT = int(os.getenv('STREAMLIT_PORT', 8501))

ENDPOINTS = {
    'conversations': f'{API_BASE_URL}/conversations',
    'analytics': f'{API_BASE_URL}/analytics'
} 