# Generated by Django 5.1.1 on 2024-09-04 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_location_date_created_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='location',
            new_name='locations',
        ),
    ]
