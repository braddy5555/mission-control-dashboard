#!/usr/bin/env python3
"""
Cosmic Puppies Email Client
Directe SMTP/IMAP verbinding zonder complexe dependencies
"""
import smtplib
import imaplib
import ssl
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configuratie
EMAIL = "nadim@cosmicpuppies.nl"
PASSWORD = "4K_M_VnbPDRhq4!"
IMAP_SERVER = "mail.mijndomein.nl"
IMAP_PORT = 993
SMTP_SERVER = "mail.mijndomein.nl"
SMTP_PORT = 465

def send_email(to_email, subject, body, html=None):
    """Verstuur een email via SMTP"""
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Plain text versie
        msg.attach(MIMEText(body, 'plain'))
        
        # HTML versie (optioneel)
        if html:
            msg.attach(MIMEText(html, 'html'))
        
        # Verbind met SMTP
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(EMAIL, PASSWORD)
            server.sendmail(EMAIL, to_email, msg.as_string())
        
        print(f"✅ Email verstuurd naar {to_email}")
        return True
        
    except Exception as e:
        print(f"❌ Fout bij verzenden: {e}")
        return False

def read_inbox(limit=10):
    """Lees de inbox via IMAP"""
    try:
        context = ssl.create_default_context()
        with imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT, ssl_context=context) as mail:
            mail.login(EMAIL, PASSWORD)
            mail.select('inbox')
            
            # Zoek naar alle emails
            _, search_data = mail.search(None, 'ALL')
            email_ids = search_data[0].split()
            
            # Laatste N emails
            recent_ids = email_ids[-limit:]
            
            emails = []
            for eid in reversed(recent_ids):
                _, data = mail.fetch(eid, '(RFC822)')
                raw_email = data[0][1]
                emails.append({
                    'id': eid.decode(),
                    'raw': raw_email
                })
            
            print(f"✅ {len(emails)} emails opgehaald")
            return emails
            
    except Exception as e:
        print(f"❌ Fout bij lezen inbox: {e}")
        return []

def send_lead_email(lead_name, lead_email, company, pain_points):
    """Verstuur gepersonaliseerde lead email"""
    subject = f"Quick scan: {company}'s digitale presence"
    
    body = f"""Hi {lead_name},

Ik zag dat {company} flink aan het groeien is. Mooi!

Vraagje: loopt je website nog mee met die groei?

Ik heb een snelle scan gedaan en zie 3 quick wins:
1. {pain_points[0] if pain_points else 'Website optimalisatie'}
2. {pain_points[1] if len(pain_points) > 1 else 'AI-automatisering'}
3. {pain_points[2] if len(pain_points) > 2 else 'Conversie optimalisatie'}

Ik help founders met AI-gedreven groei. 

Worth a 5-min chat?

- Nadim
Cosmic Puppies AI Agency
"""
    
    return send_email(lead_email, subject, body)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Gebruik:")
        print("  python3 email_client.py test              # Test verbinding")
        print("  python3 email_client.py inbox             # Lees inbox")
        print("  python3 email_client.py send <to> <subj> <body>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "test":
        print("🔌 Test verbinding...")
        # Test SMTP
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(EMAIL, PASSWORD)
            print("✅ SMTP verbinding OK")
        print("✅ Alle systemen operationeel!")
        
    elif command == "inbox":
        print("📧 Inbox ophalen...")
        emails = read_inbox()
        for e in emails:
            print(f"  - ID: {e['id']}")
            
    elif command == "send" and len(sys.argv) >= 5:
        to = sys.argv[2]
        subject = sys.argv[3]
        body = sys.argv[4]
        send_email(to, subject, body)
        
    else:
        print("Onbekend commando")
