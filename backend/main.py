import base64
import typing
import os
import datetime
from typing import Optional
from email_validator import EmailSyntaxError
from pydantic.errors import EmailError

from fastapi import FastAPI, Form, Header, Response, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from deta import Deta
from pydantic import EmailStr, BaseModel
from mailer import send_registration_mail, send_event_mails


load_dotenv()

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

db = deta.Base(os.getenv("DETA_DB_NAME"))
subscriptions = deta.Base(os.getenv("DETA_SUBSCRIPTIONS_DB_NAME"))

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
    start_time: str
    location_description: str

@app.post("/registrations", status_code=201)
def create_registration(registration: Registation, tasks: BackgroundTasks, x_token: str = Header(None)):
    if x_token == os.getenv("DETA_API_TOKEN"):
        obj = db.put(
            {
                "event_name": registration.event_name,
                "email": registration.email,
                "needs_gear": registration.needs_gear,
                "created_at": str(datetime.datetime.now()),
            }
        )
        tasks.add_task(send_registration_mail, registration, obj["key"])

        return
    return Response(
        status_code=401,
    )

@app.get("/subscribe/{email}", status_code=201)
def create_subscription(email: str):
    email = base64.urlsafe_b64decode(email).decode()

    try:
        subscriptions.insert(
            {
                "created_at": str(datetime.datetime.now()),
            },
            email
        )
    except Exception:
        return Response(content="You are already subscribed to our mailing list", status_code=304)
    return Response(content="Thanks for subscribing to the TroepTroep event mailing list", status_code=200)


@app.post("/subscribe/", status_code=201)
def _create_subscription(email: str):
    try:
        EmailStr.validate(email)
    except (EmailError, EmailSyntaxError):
        return Response(content="Invalid email address", status_code=400)

    try:
        subscriptions.insert(
            {
                "created_at": str(datetime.datetime.now()),
            },
            email
        )
    except Exception:
        return Response(content="You are already subscribed to our mailing list", status_code=304)
    return Response(content="Thanks for subscribing to the TroepTroep event mailing list", status_code=200)


@app.get("/unsubscribe/{email}", status_code=201)
def delete_subscription(email: bytes):
    subscriptions.delete(base64.urlsafe_b64decode(email).decode())
    return Response(content="You have been removed from our mailing list", status_code=200)

class Event(BaseModel):
    entity: typing.Dict[str, typing.Any]
"""
"entity": {
    "id": "21837152",
    "type": "item",
    "attributes": {
      "location": {
        "latitude": 49.8728253,
        "longitude": 8.6511929
      },
      "meetingpoint_description": "wedwede",
      "title": "snibbels",
      "starttime": "2021-02-22T00:00:00+01:00",
      "endtime": "2021-02-22T21:30:00+01:00",
      "date": "2021-02-22",
      "city": "Amsterdam",
      "updated_at": "2021-02-22T21:56:11.268+01:00",
      "created_at": "2021-02-22T21:56:11.251+01:00"
    },

"""

@app.post("/submit_event", status_code=204)
def run_event_mailer(event: Event, tasks: BackgroundTasks, x_token: str = Header(None)):
    if x_token == os.getenv("DETA_API_TOKEN"):
        tasks.add_task(send_event_mails, event.entity["attributes"], subscriptions)
        return
    return Response(
        status_code=401,
    )