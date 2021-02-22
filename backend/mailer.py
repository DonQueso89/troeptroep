import base64
import os
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from urllib.parse import urljoin

WHATSAPP_JOIN_URL = os.getenv("WHATSAPP_JOIN_URL")
SUBSCRIBE_URL = urljoin(os.getenv("DETA_ROOT_URL"), "subscribe/%s")
UNSUBSCRIBE_URL = urljoin(os.getenv("DETA_ROOT_URL"), "unsubscribe/%s")

def send_registration_mail(registration, registration_key):
    message = MIMEMultipart("alternative")
    message["Subject"] = "TroepTroep welcomes you"
    message["From"] = os.getenv("GMAIL_UNAME")
    message["To"] = registration.email
    message["Cc"] = "troeptroepen@gmail.com"

    subscription_url = SUBSCRIBE_URL % registration_key

    gear_payload = "You've asked us to bring some gear for you.<br> This means that we will bring a ring, grabber and gloves for you to borrow.<br>"
    if not registration.needs_gear:
        gear_payload = "You already have your own gear so we won't bring any for you."

    plain_text_body = f"""
        Hi Troeper!
        You just registered for {registration.event_name}.
        We look forward to welcoming you on the team.

        Practical info
        We meet at flarpendarp at 666 o clock.
        {gear_payload} If this changes. Please let us know at least a day before.
        
        TroepTroep channels you may want to join
                WhatsApp: {WHATSAPP_JOIN_URL}
                A read only group where we announce all our events
                
                Email: {subscription_url}
                Get an email each time (and only when) we have a new event.
    """

    html_body = f"""\
        <html>
            <body>
                <h2>Hi Troeper!</h2>
                You just registered for {registration.event_name}.
                We look forward to welcoming you on the team.<br>

                <h3>Practical info</h3>

                <ul>
                    <li>Meeting point: <strong> {registration.location_description} </strong></li>
                    <li>Meeting time: <strong> {registration.start_time} </strong></li>
                    <li>{gear_payload} If this changes. Please let us know at least a day before.</li>
                </ul>
                
                <h3>TroepTroep channels you may want to join</h3>
                <ul>
                    <li>
                        <a href="{WHATSAPP_JOIN_URL}">WhatsApp</a> 
                        A read only group where we announce all our events
                    </li>
                    <li>
                        <a href="{subscription_url}">Email</a> 
                        Get an email each time (and only when) we have a new event.
                    </li>
                </ul>
            </body>
        </html>
    """

    # client tries to render payload in reverse attaching order
    message.attach(MIMEText(plain_text_body, "plain"))
    message.attach(MIMEText(html_body, "html"))

    context = ssl.create_default_context()
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls(context=context)
        server.login(os.getenv("GMAIL_UNAME"), os.getenv("GMAIL_PWD"))
        server.sendmail(os.getenv("GMAIL_UNAME"), registration.email, message.as_string())


def send_event_mails(event, subscriptions):
    for s in next(subscriptions.fetch()):
        send_event_mail(event, s)

def send_event_mail(event, subscription):
    message = MIMEMultipart("alternative")
    message["Subject"] = f"New TroepTroep event: {event['title']}"
    message["From"] = os.getenv("GMAIL_UNAME")
    message["To"] = subscription["key"]
    message["Cc"] = "troeptroepen@gmail.com"

    unsubscription_url = UNSUBSCRIBE_URL % base64.urlsafe_b64encode(subscription["key"].encode()).decode()

    plain_text_body = f"""
        Hi Troeper!
        
        TroepTroep announces: {event["title"]}

        Check out https://troeptroep.nl/action/ for details.
        
        We look forward to seeing you there.
    """

    html_body = f"""\
        <html>
            <body>
                <h2>Hi Troeper!</h2>
                
                <h3>TroepTroep announces: {event["title"]}</h3>

                <ul>
                    <li>Date: {event["date"]}</li>
                    <li>Location: {event["city"]}</li>
                    <li>Meetingpoint: {event["meetingpoint_description"]}</li>
                </ul>

                Check out our <a href="https://troeptroep.nl/action/" target="_blank" rel="noreferrer">calendar</a> for more details.<br><br>
                
                We look forward to seeing you there.<br><br>
            </body>
            <footer style="font-size:10px"><a href="{unsubscription_url}">unsubscribe</a> from our mailing list</footer>
        </html>
    """

    message.attach(MIMEText(plain_text_body, "plain"))
    message.attach(MIMEText(html_body, "html"))

    context = ssl.create_default_context()
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls(context=context)
        server.login(os.getenv("GMAIL_UNAME"), os.getenv("GMAIL_PWD"))
        server.sendmail(os.getenv("GMAIL_UNAME"), subscription["key"], message.as_string())

