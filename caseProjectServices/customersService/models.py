from django.db import models

# Create your models here.

#Customer model.
class Customer(models.Model):
    name = models.CharField(max_length=100, default="")
    surname = models.CharField(max_length=100, default="")
    type = models.CharField(max_length=100,default="")
    voting = models.FloatField(null=True, blank=True, default=0)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name