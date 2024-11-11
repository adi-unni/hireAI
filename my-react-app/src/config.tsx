declare const process: {
  env: {
    REACT_APP_API_URL?: string;
    REACT_APP_ANALYTICS_URL?: string;
  }
};

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
export const ANALYTICS_URL = process.env.REACT_APP_ANALYTICS_URL || 'http://localhost:5000';