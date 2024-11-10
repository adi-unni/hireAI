import os
from python_dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:1573/api')
ENDPOINTS = {
    'conversations': f'{API_BASE_URL}/conversations',
    'analytics': f'{API_BASE_URL}/analytics'
} 