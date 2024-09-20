from unicodedata import category
from django import forms
from .models import Category, Location, Bus
from datetime import datetime

class SaveCategory(forms.ModelForm):
    name = forms.CharField(max_length="250")
    description = forms.Textarea()
    status = forms.ChoiceField(choices=[('1','Active'),('2','Inactive')])

    class Meta:
        model = Category
        fields = ('name','description','status')

    def clean_name(self):
        id = self.instance.id if self.instance.id else 0
        name = self.cleaned_data['name']
        # print(int(id) > 0)
        # raise forms.ValidationError(f"{name} Category Already Exists.")
        try:
            if int(id) > 0:
                category = Category.objects.exclude(id=id).get(name = name)
            else:
                category = Category.objects.get(name = name)
        except:
            return name
            # raise forms.ValidationError(f"{name} Category Already Exists.")
        raise forms.ValidationError(f"{name} Category Already Exists.")

class SaveLocation(forms.ModelForm):
    location = forms.CharField(max_length=250)
    status = forms.ChoiceField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')])
    action = forms.ChoiceField(choices=[('update', 'Update'), ('delete', 'Delete')])

    class Meta:
        model = Location
        fields = ('location', 'status')

    def clean_location(self):
        id = self.instance.id if self.instance.id else 0
        location = self.cleaned_data['location']
        try:
            if int(id) > 0:
                # Check for existing location excluding the current one being updated
                Location.objects.exclude(id=id).get(location=location)
            else:
                Location.objects.get(location=location)
        except Location.DoesNotExist:
            return location
        raise forms.ValidationError(f"{location} Location Already Exists.")
    

class SaveBus(forms.ModelForm):
    bus_number = forms.CharField(max_length=250)
    seats = forms.IntegerField()
    status = forms.ChoiceField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')])
    category = forms.ModelChoiceField(queryset=Category.objects.all())
    action = forms.ChoiceField(choices=[('update', 'Update'), ('delete', 'Delete')])

    class Meta:
        model = Bus
        fields = ('bus_number', 'seats', 'status', 'category')

    def clean_bus_number(self):
        id = self.instance.id if self.instance.id else 0
        bus_number = self.cleaned_data['bus_number']
        try:
            if int(id) > 0:
                # Check for existing bus number excluding the current one being updated
                Bus.objects.exclude(id=id).get(bus_number=bus_number)
            else:
                Bus.objects.get(bus_number=bus_number)
        except Bus.DoesNotExist:
            return bus_number
        raise forms.ValidationError(f"Bus number {bus_number} already exists.")

