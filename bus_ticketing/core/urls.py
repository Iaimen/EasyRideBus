from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BusViewSet, LocationViewSet, BookingViewSet,ScheduleViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'buses', BusViewSet)
router.register(r'location', LocationViewSet)
router.register(r'booking', BookingViewSet)
router.register(r'schedules', ScheduleViewSet)

urlpatterns = [
    # path('login/', views.login(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', include(router.urls)),
    
    
]