# Generated by Django 5.1.1 on 2024-09-04 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_category_date_created_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='location',
            name='date_updated',
        ),
    ]
