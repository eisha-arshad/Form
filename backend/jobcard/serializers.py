# from rest_framework import serializers
# from .models import JobCard, InspectionItem

# class InspectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = InspectionItem
#         fields = '__all__'

# class JobCardSerializer(serializers.ModelSerializer):
#     inspections = InspectionSerializer(many=True)

#     class Meta:
#         model = JobCard
#         fields = '__all__'

#     def create(self, validated_data):
#         inspections_data = validated_data.pop('inspections')
#         jobcard = JobCard.objects.create(**validated_data)  # pylint: disable=no-member

#         for item in inspections_data:
#             InspectionItem.objects.create(  # pylint: disable=no-member
#                 jobcard=jobcard,
#                 **item
#             )

#         return jobcard
from rest_framework import serializers
from .models import JobCard

class JobCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCard
        fields = "__all__"
