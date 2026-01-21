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

    # Inspection JSON
    inspection = models.JSONField(default=dict)

    # Requests JSON
    requests = models.JSONField(default=dict)

    # Quality Check
    qc = models.JSONField(default=dict)

    # Customer info
    customer = models.JSONField(default=dict)

    # Receive/Deliver
    receive_deliver = models.JSONField(default=dict)

    # Signature image
    signature = models.ImageField(upload_to="signatures/", null=True, blank=True)

    # Status: draft or submitted
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quotation} - {self.customer.get('name', 'Unknown')}"  # pylint: disable=no-member

