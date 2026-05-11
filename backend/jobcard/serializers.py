from rest_framework import serializers
from .models import JobCard


class JobCardSerializer(serializers.ModelSerializer):

    pdf_file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = JobCard
        fields = "__all__"