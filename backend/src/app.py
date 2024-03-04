from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config.database import init_db

# Routes Import
from src.routes.admin_router import admin
from src.routes.inquiry_router import inquiry
from src.routes.intent_router import intent
from src.routes.knowledge_base_router import kbs

app = FastAPI(
    title="UCnian Guide Bot APIs",
    description="These APIs encompass the entire UCnian Guide Bot platform, serving both the admin portal and user portal.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(admin, tags=["Admins"], prefix="/api/v1/admins")
app.include_router(inquiry, tags=["Inquiries"], prefix="/api/v1/inquiries")
app.include_router(intent, tags=["Intents"], prefix="/api/v1/intents")
app.include_router(kbs, tags=["KnowledgeBase"], prefix="/api/v1/kbs")


@app.on_event("startup")
async def start_db():
    await init_db()
