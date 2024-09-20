from django.contrib import admin
from core.models import Category, Bus,Booking, Schedule, Location

# Register your models here.
admin.site.register(Category)
admin.site.register(Bus)
admin.site.register(Booking)
admin.site.register(Schedule)
admin.site.register(Location)