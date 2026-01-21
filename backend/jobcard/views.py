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
