"""
Utility module for generating PDF reports for JobCards.
"""

from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def generate_jobcard_pdf(jobcard):
    """
    Generates a PDF byte string for a specific JobCard instance.
    """
    buffer = BytesIO()
    # Using A4 constant (595.27, 841.89) instead of hardcoded numbers
    p = canvas.Canvas(buffer, pagesize=A4)
    _, height = A4

    # Extracting data safely
    customer = jobcard.customer or {}
    receive = jobcard.receive_deliver or {}
    qc = jobcard.qc or {}

    y = height - 40

    def line(text, step=15, font_size=10, bold=False):
        nonlocal y
        if y < 50:  # Simple page break check
            p.showPage()
            y = height - 40
        
        if bold:
            p.setFont("Helvetica-Bold", font_size)
        else:
            p.setFont("Helvetica", font_size)
            
        p.drawString(40, y, str(text))
        y -= step

    # --- Header ---
    line("JOB CARD REPORT", step=20, font_size=16, bold=True)
    line("-" * 80, step=20)

    # --- Core Info ---
    line(f"Quotation No: {jobcard.quotation}", bold=True)
    line(f"Sales Order: {jobcard.sales}")
    line(f"Invoice No: {jobcard.invoice}")
    line(f"VIN Number: {jobcard.vin}")

    line("", step=10)
    line("CUSTOMER INFORMATION", bold=True)
    line(f"Name: {customer.get('name','')}")
    line(f"Email: {customer.get('email','')}")
    line(f"Garage User: {customer.get('garageUser','')}")
    line(f"Satisfaction: {customer.get('satisfaction','')}")
    line(f"Time In: {customer.get('timeIn','')}")
    line(f"Time Out: {customer.get('timeOut','')}")

    line("", step=10)
    line("RECEIVE & DELIVER INFO", bold=True)
    line(f"Receive Date: {receive.get('receiveDate','')}")
    line(f"Receive Time: {receive.get('receiveTime','')}")
    line(f"Deliver Time: {receive.get('deliverTime','')}")

    line("", step=10)
    line("QUALITY CONTROL (QC) DATA", bold=True)
    # Converting lists to strings if they are saved as arrays in JSON
    line(f"Start KM: {', '.join(map(str, qc.get('startKm', []))) if isinstance(qc.get('startKm'), list) else qc.get('startKm', '')}")
    line(f"End KM: {', '.join(map(str, qc.get('endKm', []))) if isinstance(qc.get('endKm'), list) else qc.get('endKm', '')}")
    line(f"Remarks: {qc.get('remarks', '')}")

    p.showPage()
    p.save()

    pdf_data = buffer.getvalue()
    buffer.close()

    return pdf_data
