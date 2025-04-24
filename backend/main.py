# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os  
import base64
from openai import AzureOpenAI
from openai.types.chat import ChatCompletion

endpoint = os.getenv("ENDPOINT_URL", "https://finwise-chatbot.openai.azure.com/")  
deployment = os.getenv("DEPLOYMENT_NAME", "o1")  
subscription_key = os.getenv("AZURE_OPENAI_API_KEY", "REPLACE_WITH_YOUR_KEY_VALUE_HERE")  

app = FastAPI()

# Internal API stuff
# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5005", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PingPayload(BaseModel):
    message: str

@app.post("/api/ping")
async def ping(payload: PingPayload):
    print(f"Received: {payload.message}")

    return {"message": get_me_a_completion(payload.message)}



def get_me_a_completion(message: str):
    # Initialize Azure OpenAI Service client with key-based authentication    
    client = AzureOpenAI(  
        azure_endpoint=endpoint,  
        api_key=subscription_key,  
        api_version="2025-01-01-preview",
    )

    #Prepare the chat prompt 
    chat_prompt = [
        {
            "role": "system",
            "content": "You are a chatbot for a financial advice company"
        },
        {
            "role": "user",
            "content": message,
        }
    ] 
        
    # Include speech result if speech is enabled  
    messages = chat_prompt  
        
    # Generate the completion  
    completion: ChatCompletion = client.chat.completions.create(  
        model=deployment,
        messages=messages,
        max_completion_tokens=40000,
        stop=None,  
        stream=False
    )

    return str(completion.choices[0].message.content)



