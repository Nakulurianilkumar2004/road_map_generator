from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow all CORS requests (for development purposes)

# Get the API key from environment variable
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route("/get-career-advice", methods=["POST"])
def get_career_advice():
    try:
        data = request.get_json()
        job_role = data.get('job_role')

        if not job_role:
            return jsonify({'error': 'Job role is required'}), 400

        prompt = f"""
        You are an AI career coach. Based on the following job role, provide a comprehensive roadmap, including the essential skills, tools, and knowledge areas that a person should focus on for excelling in this field. Suggest:
        1. Core skills and technologies to learn
        2. Areas to focus on for professional growth
        3. Certifications or courses that could enhance the job profile

        Job Role:
        {job_role}
        """

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "messages": [
                {"role": "system", "content": "You are an AI career coach who provides detailed career advice based on job roles."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

        res = requests.post(GROQ_URL, headers=headers, json=payload)
        res.raise_for_status()

        response_text = res.json()["choices"][0]["message"]["content"]
        return jsonify({"response": response_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)