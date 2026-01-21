# from django.contrib import admin
# from .models import JobCard, InspectionItem

# class JobCardAdmin(admin.ModelAdmin):
#     list_display = ("customer_name", "vin_no", "created_at")
#     search_fields = ("customer_name", "vin_no")

# admin.site.register(JobCard, JobCardAdmin)
# admin.site.register(InspectionItem)
# jobs/admin.py
from django.contrib import admin
from .models import JobCard

@admin.register(JobCard)
class JobCardAdmin(admin.ModelAdmin):
    list_display = ('quotation', 'invoice', 'status', 'created_at')
    list_filter = ('status',)   # 👈 DRAFT / SUBMITTED filter
