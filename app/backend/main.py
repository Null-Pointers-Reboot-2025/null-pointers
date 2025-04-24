# main.py
import os  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AzureOpenAI
from openai.types.chat import ChatCompletion

with open("system_prompt.txt", "r", encoding="UTF-8") as f:
    system_prompt = f.read()



CONVERSATION = [
        {
            "role": "system",
            "content": system_prompt
        },
]


endpoint = os.getenv("ENDPOINT_URL")  
deployment = "4o"
subscription_key = os.getenv("AZURE_OPENAI_API_KEY")  

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

    completion = get_me_a_completion(payload.message)

    if completion == "":
        raise Exception("it gave us nothing")

    return {"message": completion}



def get_me_a_completion(message: str):
    # Initialize Azure OpenAI Service client with key-based authentication    
    client = AzureOpenAI(  
        azure_endpoint=endpoint,  
        api_key=subscription_key,  
        api_version="2025-01-01-preview",
    )


    CONVERSATION.append({
            "role": "user",
            "content": message,
        })

        
    # Include speech result if speech is enabled  
    messages = CONVERSATION  
        
    # Generate the completion  
    completion: ChatCompletion = client.chat.completions.create(  
        model=deployment,
        messages=messages,
        max_completion_tokens=1000,
        stop=None,  
        stream=False,
    )

    CONVERSATION.append({
        "role": "assistant",
        "content": completion.choices[0].message.content

    })

    print(completion.choices[0].message.content)
    return str(completion.choices[0].message.content)



