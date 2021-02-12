import os
import datetime
from typing import Optional

from fastapi import FastAPI, Form, Header, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from deta import Deta
from pydantic import EmailStr, BaseModel
from mailer import send_mail


load_dotenv()

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

db = deta.Base(os.getenv("DETA_DB_NAME"))

app = FastAPI()

ALLOWED_ORIGINS = [
    "https://troeptroep.nl",
]

if os.getenv("DEBUG"):
    ALLOWED_ORIGINS.append("http://localhost:8000")

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
        send_mail(registration)

        return
    return Response(
        content=str({"server": os.getenv("DETA_API_TOKEN"), "client": x_token}),
        status_code=401,
    )

# TODO
@app.get("/subscribe/{hashed_email}", status_code=201)
def create_subscription(hashed_email: str):
    return "Thanks for subscribing to the TroepTroep event mailing list :D"
