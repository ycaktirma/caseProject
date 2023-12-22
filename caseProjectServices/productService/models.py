from django.db import models
from customersService.models import Customer

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    waterCost = models.FloatField(default=0)
    cost = models.FloatField(default=0)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

