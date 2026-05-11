from django.db import models

<<<<<<< HEAD

class JobCard(models.Model):

=======
class JobCard(models.Model):
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
    ]

<<<<<<< HEAD
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
=======
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

>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
