# Generated by Django 5.1.1 on 2024-09-05 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_alter_schedule_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='date_updated',
        ),
    ]
