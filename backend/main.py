import os
import datetime
from typing import Optional

from fastapi import FastAPI, Form, Header, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from deta import Deta
from pydantic import EmailStr, BaseModel

load_dotenv()

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

db = deta.Base(os.getenv("DETA_DB_NAME"))

app = FastAPI()

ALLOWED_ORIGINS = [
    "https://troeptroep.nl",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,  # no cookies
    allow_methods=["POST"],
    allow_headers=["*"],
)

class Registation(BaseModel):
    event_name: str
    email: EmailStr
    needs_gear: bool


@app.post("/registrations", status_code=201)
def create_registration(registration: Registation, x_token: str = Header(None)):
    if x_token == os.getenv("DETA_API_TOKEN"):
        db.put(
            {
                "event_name": registration.event_name,
                "email": registration.email,
                "needs_gear": registration.needs_gear,
                "created_at": str(datetime.datetime.now()),
            }
        )
        return 
    return Response(content=str({'server': os.getenv("DETA_API_TOKEN"), 'client': x_token}), status_code=401)