# HireAI - Human Insights and Recruitment Evaluator

HireAI is an interactive platform designed to evaluate candidate insights, recall, and analytical abilities using AI-driven assessments. This project uses React, TypeScript, Vite, and LangChain's OpenAI API to deliver a smooth and responsive experience for candidates and assessors.

# Project Setup
This project uses Vite for fast refresh and modern development, and it integrates with an Express server for backend interactions with the OpenAI API.

# Prerequisites
- Node.js (v14 or higher recommended)
- npm

# Local Development

To run this project locally, follow these steps:

- Clone the Repository

```
git clone https://github.com/yourusername/HireAI.git
cd HireAI
```

- Install Dependencies:
```
npm install
```

- Set Up Environment Variables:
Create a .env file in the root directory and add your OpenAI API key and other environment variables.
```
OPENAI_API_KEY=your_openai_api_key
```

- Run servers
Run the ports 3000 and 5173 by running
```
npm run dev
```


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
