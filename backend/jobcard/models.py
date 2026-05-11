from django.db import models


class JobCard(models.Model):

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
    ]

    # ================= HEADER =================
    quotation = models.CharField(max_length=50)

    sales = models.CharField(max_length=50)

    invoice = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    vin = models.CharField(max_length=50)

    # ================= JSON DATA =================
    inspection = models.JSONField(
        default=dict,
        blank=True
    )

    requests = models.JSONField(
        default=dict,
        blank=True
    )

    qc = models.JSONField(
        default=dict,
        blank=True
    )

    customer = models.JSONField(
        default=dict,
        blank=True
    )

    receive_deliver = models.JSONField(
        default=dict,
        blank=True
    )

    # ================= SIGNATURE =================
    signature = models.TextField(
        blank=True,
        null=True
    )

    # ================= PDF FILE =================
    pdf_file = models.FileField(
        upload_to="jobcards/",
        blank=True,
        null=True
    )

    # ================= STATUS =================
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )

    # ================= DATES =================
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        customer_name = self.customer.get(
            "name",
            "Unknown"
        )

        return f"{self.quotation} - {customer_name}"