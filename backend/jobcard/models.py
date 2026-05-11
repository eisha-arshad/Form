from django.db import models


class JobCard(models.Model):

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
    ]

    # Header info
    quotation = models.CharField(max_length=50)
    sales = models.CharField(max_length=50)
    invoice = models.CharField(max_length=50, default="")
    vin = models.CharField(max_length=50)

    # JSON data
    inspection = models.JSONField(default=dict, blank=True)
    requests = models.JSONField(default=dict, blank=True)
    qc = models.JSONField(default=dict, blank=True)
    customer = models.JSONField(default=dict, blank=True)
    receive_deliver = models.JSONField(default=dict, blank=True)

    # Signature
    signature = models.TextField(blank=True, null=True)

    # PDF file
    pdf_file = models.FileField(upload_to="jobcards/", blank=True, null=True)

    # Status
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quotation} - {self.customer.get('name', 'Unknown')}"