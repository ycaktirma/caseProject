# Generated by Django 4.2.8 on 2023-12-20 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customersService', '0002_customer_surname_customer_type_customer_voting_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='voting',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
