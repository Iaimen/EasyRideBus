# Generated by Django 5.1.1 on 2024-09-05 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_remove_bus_date_created_remove_bus_date_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='status',
            field=models.CharField(choices=[('Active', 'Active'), ('Cancelled', 'Cancelled')], default='Active', max_length=10),
        ),
    ]
