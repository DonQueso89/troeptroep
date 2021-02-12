import os
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from urllib.parse import urljoin

WHATSAPP_JOIN_URL = os.getenv("WHATSAPP_JOIN_URL")
SUBSCRIBE_URL = urljoin(os.getenv("DETA_ROOT_URL"), "subscribe/krebbels") # TODO

def send_mail(registration):
    message = MIMEMultipart("alternative")
    message["Subject"] = "TroepTroep welcomes you"
    message["From"] = os.getenv("GMAIL_UNAME")
    message["To"] = registration.email
    message["Bcc"] = "kg.v.ekeren@gmail.com,jacobusgdeswart@gmail.com"

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
                
                Email: {SUBSCRIBE_URL}
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
                    <li>We meet at flarpendarp at 666 o clock</li>
                    <li>{gear_payload} If this changes. Please let us know at least a day before.</li>
                </ul>
                
                <h3>TroepTroep channels you may want to join</h3>
                <ul>
                    <li>
                        <a href="{WHATSAPP_JOIN_URL}">WhatsApp</a> 
                        A read only group where we announce all our events
                    </li>
                    <li>
                        <a href="{SUBSCRIBE_URL}">Email</a> 
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

