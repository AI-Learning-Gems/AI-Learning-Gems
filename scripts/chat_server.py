import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from litellm import completion
from dotenv import load_dotenv

# Load environment variables (API keys)
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    query: str
    selection: str | None = None
    context: str | None = None
    url: str | None = None
    model: str = "openai/gpt-oss-120b:free" # Default model

# In-memory session store: { session_id: [messages] }
sessions = {}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        session_id = request.session_id
        
        # Check if we need to initialize or reset the session
        # We reset if:
        # 1. Session doesn't exist
        # 2. Context is explicitly provided (implies new chapter/page)
        
        if session_id not in sessions or request.context:
            if request.context:
                # New context provided -> Reset/Init session
                system_prompt = (
                    "You are a helpful and knowledgeable AI teaching assistant for a textbook. "
                    "You are provided with the raw HTML content of the current chapter. "
                    "Use the HTML structure (headers, tables, lists) to understand the context better. "
                    "Answer the user's question based on this content."
                )
                
                sessions[session_id] = [
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user", 
                        "content": f"HTML Context from Chapter:\n\n{request.context}\n\n(Please acknowledge this context)"
                    },
                    {
                        "role": "assistant", 
                        "content": "I have received the chapter HTML context and am ready to answer your questions."
                    }
                ]
            elif session_id not in sessions:
                # Session expired/missing and no context provided
                raise HTTPException(status_code=400, detail="Session expired. Please refresh the page to reload context.")

        # Construct User Message (Query + Selection)
        user_text = ""
        if request.selection:
            user_text += f"I have selected the following text:\n\"{request.selection}\"\n\n"
        
        user_text += request.query
        
        # Append user message to history
        sessions[session_id].append({"role": "user", "content": user_text})

        # Call LiteLLM (via OpenRouter)
        completion_model = f"openrouter/{request.model}"

        response = completion(
            model=completion_model,
            messages=sessions[session_id],
            api_key=os.getenv("OPENROUTER_API_KEY"),
            temperature=0.3,
        )
        
        answer = response.choices[0].message.content
        
        # Append assistant response to history
        sessions[session_id].append({"role": "assistant", "content": answer})
        
        return {"response": answer}

    except Exception as e:
        print(f"Error: {e}")
        # If it's our own 400, re-raise
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("Starting Chatbot Server on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
