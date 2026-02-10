from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List
import asyncio
from transformers import pipeline
from contextlib import asynccontextmanager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Setup logging FIRST
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global summarizers dictionary
summarizers = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global summarizers
    print("Loading summarization models...")
    try:
        summarizers = {
            "BART": pipeline("summarization", model="facebook/bart-large-cnn"),
            "PEGASUS": pipeline("summarization", model="google/pegasus-xsum"),
            "T5": pipeline("summarization", model="t5-base")
        }
        print("✅ Models loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load models: {e}")
        print(f"❌ Error loading models: {e}")
    
    yield
    
    # Shutdown
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

class SummarizeRequest(BaseModel):
    text: str

class ModelSummary(BaseModel):
    model_name: str
    summary: str
    error: str = None

class SummarizeResponse(BaseModel):
    summaries: List[ModelSummary]

@api_router.get("/")
async def root():
    return {"message": "Text Summarizer API Ready", "models": list(summarizers.keys())}

async def summarize_with_model(text: str, model_name: str, summarizer) -> ModelSummary:
    """Summarize text using a specific model"""
    try:
        # Split text if too long
        result = summarizer(text, max_length=150, min_length=50, do_sample=False, truncation=True)
        summary = result[0]['summary_text']
        
        return ModelSummary(
            model_name=model_name,
            summary=summary
        )
    except Exception as e:
        logger.error(f"Error with {model_name}: {str(e)}")
        return ModelSummary(
            model_name=model_name,
            summary="",
            error=str(e)
        )

@api_router.post("/summarize", response_model=SummarizeResponse)
async def summarize_text(request: SummarizeRequest):
    """Summarize text using multiple models"""
    if not request.text or len(request.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Text must be at least 10 characters long")
    
    # Run all summarizations in parallel
    tasks = [
        summarize_with_model(request.text, name, summarizer)
        for name, summarizer in summarizers.items()
    ]
    
    summaries = await asyncio.gather(*tasks)
    return SummarizeResponse(summaries=summaries)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",  
        port=8000,
        reload=True
    )