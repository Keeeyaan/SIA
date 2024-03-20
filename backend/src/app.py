from os import getenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from src.config.database import init_db

# Routes Import
from src.routes.authentication_router import auth
from src.routes.admin_router import admin
# from src.routes.inquiry_router import inquiry
# from src.routes.intent_router import intent
# from src.routes.knowledge_base_router import kbs
# from src.routes.feedback_router import feedback

# from src.routes.conversation_router import conversation #comment this on push
# from src.routes.model_router import model #comment this on push

load_dotenv()
origins = getenv('ORIGINS').split(' ')

app = FastAPI(
    title="UCnian Guide Bot APIs",
    description="These APIs encompass the entire UCnian Guide Bot platform, serving both the admin portal and user portal.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth, tags=["Authentication"], prefix="/api/v1/auth")
app.include_router(admin, tags=["Admins"], prefix="/api/v1/admins")
# app.include_router(kbs, tags=["KnowledgeBase"], prefix="/api/v1/kbs")
# app.include_router(inquiry, tags=["Inquiries"], prefix="/api/v1/inquiries")
# app.include_router(intent, tags=["Intents"], prefix="/api/v1/intents")
# app.include_router(feedback, tags=["Feedbacks"], prefix="/api/v1/feedbacks")
# app.include_router(conversation, tags=[
#                    "Conversations"], prefix="/api/v1/conversation") #comment this on push
# app.include_router(model, tags=["Model"], prefix="/api/v1/model") #comment this on push


@app.on_event("startup")
async def start_db():
    await init_db()
