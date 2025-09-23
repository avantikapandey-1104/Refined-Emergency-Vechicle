from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VitalsViewSet, LocationViewSet, QoDViewSet, qod_stabilize, get_vitals, get_location

router = DefaultRouter()
router.register(r'vitals', VitalsViewSet)
router.register(r'location', LocationViewSet)
router.register(r'qod', QoDViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('qod-stabilize/', qod_stabilize, name='qod-stabilize'),
    path('get-vitals/', get_vitals, name='get-vitals'),
    path('get-location/', get_location, name='get-location'),
]
