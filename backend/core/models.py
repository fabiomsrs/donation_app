from django.db import models

# Create your models here.

class Payment(models.Model):
    PAYMENT_OPTIONS = (("card", "Card"), ("cash", "Cash"))

    value = models.DecimalField(max_digits=30, decimal_places=2, default=0, verbose_name="Valor") 
    payment_method = models.CharField(max_length=255, choices=PAYMENT_OPTIONS)


class Tithe(models.Model):
    payment = models.OneToOneField("Payment", on_delete=models.CASCADE, related_name="tithe")    
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="my_tithes")
    created_date = models.DateTimeField("data de pagamento")


class Donate(models.Model):
    payment = models.OneToOneField("Payment", on_delete=models.CASCADE, related_name="donate")    
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="my_donates")
    created_date = models.DateTimeField("data de pagamento")