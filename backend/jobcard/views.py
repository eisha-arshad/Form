<<<<<<< HEAD
import json
import logging
from smtplib import SMTPException

from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from django.core.mail import EmailMessage
from django.conf import settings

from .models import JobCard
from .serializers import JobCardSerializer

logger = logging.getLogger(__name__)


class JobCardViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling JobCard creation, including JSON parsing,
    PDF attachment, and automated email notifications.
    """
    queryset = JobCard.objects.all().order_by("-created_at")
    serializer_class = JobCardSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        """
        Creates a JobCard and sends an email notification to the customer.
        """
        # ================= SAFE DATA =================
        data = request.data.dict() if hasattr(request.data, "dict") else request.data
        pdf_file = request.FILES.get("pdf", None)

        # ================= JSON FIELDS FIX =================
        json_fields = ["inspection", "requests", "qc", "customer", "receive_deliver"]

        for field in json_fields:
            value = data.get(field)
            if isinstance(value, str):
                try:
                    parsed = json.loads(value)
                    data[field] = parsed if isinstance(parsed, dict) else {}
                except (json.JSONDecodeError, TypeError):
                    data[field] = {}
            elif not isinstance(value, dict):
                data[field] = {}

        # ================= SERIALIZER =================
        serializer = self.get_serializer(data=data)

        if not serializer.is_valid():
            # Lazy formatting: use %s and pass arguments separately
            logger.error("Serializer Errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        jobcard = serializer.save(pdf_file=pdf_file)

        # ================= EMAIL LOGIC =================
        try:
            customer = jobcard.customer or {}
            user_email = (customer.get("email") or "").strip()
            garage_email = (customer.get("garageUser") or "").strip()

            recipients = []

            def is_valid_email(email_str):
                return isinstance(email_str, str) and "@" in email_str and "." in email_str

            if is_valid_email(user_email):
                recipients.append(user_email)
            if is_valid_email(garage_email):
                recipients.append(garage_email)
            print("USER EMAIL:", user_email)
            print("GARAGE EMAIL:", garage_email)
            print("RECIPIENTS:", recipients)

            recipients = list(set(recipients))  # remove duplicates

            logger.info("Email Recipients: %s", recipients)

            if recipients:
                email = EmailMessage(
                    subject="Job Card Submitted Successfully",
                    body=f"""
Hello,

Your Job Card has been submitted successfully.

Quotation No: {jobcard.quotation}
Sales Order No: {jobcard.sales}
Invoice No: {jobcard.invoice}
VIN No: {jobcard.vin}

Thank you.
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=recipients,
                )

                # ================= ATTACH PDF SAFELY =================
                if jobcard.pdf_file:
                    try:
                        with jobcard.pdf_file.open("rb") as f:
                            email.attach(
                                f"jobcard_{jobcard.id}.pdf",
                                f.read(),
                                "application/pdf"
                            )
                    except (IOError, OSError) as file_err:
                        logger.error("PDF Attach Error for JobCard %s: %s", jobcard.id, file_err)
                    finally:
                        try:
                            jobcard.pdf_file.close()
                        except (IOError, OSError):
                            pass

                # ================= SEND EMAIL =================
                try:
                    email.send(fail_silently=False)
                    print("Email sent successfully")
                except Exception as e:
                    print("Email Failed:", str(e))
                    raise e     

            else:
                logger.warning("No valid email recipients found for JobCard: %s", jobcard.id)

        except (SMTPException, ConnectionError) as e:
            logger.error("SMTP/Connection Error sending email for JobCard %s: %s", jobcard.id, e)
        except Exception:  # pylint: disable=broad-exception-caught
            # logger.exception already includes the stack trace; lazy format not needed for the message itself
            logger.exception("Unexpected error in email logic for JobCard %s", jobcard.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
=======
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.generics import RetrieveUpdateAPIView
# from django.shortcuts import get_object_or_404
# from django.http import HttpResponse
# from django.template.loader import render_to_string
# from weasyprint import HTML

# from .serializers import JobCardSerializer
# from .models import JobCard


# # ------------------ Create Job Card ------------------
# class JobCardCreate(APIView):
#     def post(self, request):
#         serializer = JobCardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


# # ------------------ Retrieve / Update Job Card ------------------
# class JobCardDetail(RetrieveUpdateAPIView):
#     queryset = JobCard.objects.all()  # pylint: disable=no-member
#     serializer_class = JobCardSerializer


# # ------------------ Generate PDF of Job Card ------------------
# class JobCardPDF(APIView):
#     def get(self, request, pk):
#         # Get the JobCard object
#         job = get_object_or_404(JobCard, pk=pk)

#         # Render the HTML template with context
#         html_string = render_to_string("jobcard.html", {"job": job})

#         # Generate PDF
#         pdf_file = HTML(string=html_string).write_pdf()

#         # Return PDF as HTTP response
#         response = HttpResponse(pdf_file, content_type='application/pdf')
#         response['Content-Disposition'] = f'inline; filename="jobcard_{job.id}.pdf"'

#         return response


from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import JobCard
from .serializers import JobCardSerializer

class JobCardViewSet(viewsets.ModelViewSet):
    queryset = JobCard.objects.all().order_by('-created_at')
    serializer_class = JobCardSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
