from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


from .models import Category, Bus, Location, Booking, Schedule
from .serializers import CategorySerializer, BusSerializer, LocationSerializer, ScheduleSerializer, BookingSerializer
from rest_framework import viewsets

# Create your views here.

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        # Log the user in
        login(request, user)
        
        # Response with success message and redirect URL
        return Response({
            'message': 'Login successful',
            'redirect_url': '/admin/'
        }, status=status.HTTP_200_OK)
    else:
        # Response with error message for invalid credentials
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_400_BAD_REQUEST)
        
def logout_view(request):
    if 'username' in request.session:
        del request.session['username']
        
    return redirect('login')

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    