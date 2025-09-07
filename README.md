## ⚠️  Important Note
This project represents an early attempt in my machine learning journey. The current code is incomplete and contains unresolved challenges. I have preserved this repository as a documentation of my learning process, the challenges I faced, and a foundational step leading to my more successful projects.

# AI-Powered Medical Summarizer

## Project Description
This project is an AI-powered web application that takes a medical text as input and generates concise summaries at different levels of complexity. It's designed to make complex medical information accessible to various audiences, from general users to healthcare professionals and experts. The application also includes a Q&A feature, allowing users to ask questions and get answers based solely on the provided text.

## Features
* **Three Levels of Summarization:** Generates summaries tailored for Foundational (general audience), Applied (students/professionals), and Advanced (experts) levels.
* **Medical Q&A:** An interactive chatbot that answers questions based on the content of the provided medical text.
* **Secure API Integration:** Uses Vercel's Serverless Functions to securely handle API calls to Hugging Face models without exposing API keys.
* **User-Friendly Interface:** Built with a clean and modern design for an intuitive user experience.

## Technologies Used
* **Frontend:** HTML, CSS (Tailwind CSS), and JavaScript.
* **Backend:** Vercel Serverless Functions.
* **AI Models:**
    * Hugging Face (for text summarization).
    * Hugging Face (for question-answering).

## How to Set Up the Project

### Prerequisites
* A Hugging Face account with an API key.
* A Vercel account.

### Deployment with Vercel
1.  **Clone the Repository:** Clone this repository to your local machine.
2.  **Add Environment Variables:** In your Vercel project settings, add a new Environment Variable with the following details:
    * **Name:** `HUGGINGFACE_API_KEY`
    * **Value:** `YOUR_HUGGINGFACE_API_KEY_HERE`
3.  **Deploy:** Link the Vercel project to your GitHub repository. Vercel will automatically deploy the application.

## Medical Disclaimer
This AI agent only summarizes information based on the text provided by the user. The agent does not provide medical advice. The user is solely responsible for verifying the accuracy of the information and consulting a qualified healthcare professional for any medical decisions.
