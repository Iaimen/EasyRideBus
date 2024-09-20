from django.db import models
from django.utils import timezone
from django.db.models import Sum
from django.utils import timezone
from django.dispatch import receiver

# Create your models here.

class Category(models.Model):
      STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]
      name = models.CharField(max_length=250)
      description = models.TextField()
      status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
      
      def __str__(self):
        return self.name

class Bus(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]
    category = models.ForeignKey(Category,on_delete=models.CASCADE, blank= True, null = True)
    bus_number = models.CharField(max_length=250, default='UNKNOWN')
    seats = models.FloatField(max_length=5, default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
    def __str__(self):
       return f"{self.bus_number} ({self.category.name})"
  
class Location(models.Model):
  STATUS_CHOICES=[
    ('Active','Active'),
    ('Inactive', 'Inactive'),
  ]
  location = models.CharField(max_length=250)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
  def __str__(self):
    return self.location
  
class Schedule(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Cancelled', 'Cancelled'),
    ]

    code = models.CharField(max_length=100)
    bus = models.ForeignKey(Bus,on_delete=models.CASCADE)
    depart = models.ForeignKey(Location,on_delete=models.CASCADE, related_name='depart_location')
    destination = models.ForeignKey(Location,on_delete=models.CASCADE, related_name='destination')
    schedule= models.DateTimeField()
    fare= models.FloatField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
    
    def __str__(self):
        return str(self.code + ' - ' + self.bus.bus_number)

    def count_available(self):
        booked = Booking.objects.filter(schedule=self).aggregate(Sum('seats'))['seats__sum']
        return self.bus.seats - booked


class Booking(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
    ]
    code = models.CharField(max_length=100)
    name = models.CharField(max_length=250)
    schedule = models.ForeignKey(Schedule,on_delete=models.CASCADE)
    seats = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
    
    def __str__(self):
        return str(self.code + ' - ' + self.name)

    def total_payable(self):
        return self.seats * self.schedule.fare


