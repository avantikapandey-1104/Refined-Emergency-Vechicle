from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vitals, Location, QoD
from .serializers import VitalsSerializer, LocationSerializer, QoDSerializer
import random

class VitalsViewSet(viewsets.ModelViewSet):
    queryset = Vitals.objects.all()
    serializer_class = VitalsSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class QoDViewSet(viewsets.ModelViewSet):
    queryset = QoD.objects.all()
    serializer_class = QoDSerializer

@api_view(['POST'])
def qod_stabilize(request):
    # Simulate QoD API response
    qod = QoD.objects.create(status='stabilized')
    return Response({'message': 'Connection stabilized', 'id': qod.id})

@api_view(['GET'])
def get_vitals(request):
    # Simulate vitals data
    vitals = {
        'ecg': [random.randint(50, 150) for _ in range(20)],
        'oxygen': random.randint(90, 100),
        'bp': f'{random.randint(110, 140)}/{random.randint(70, 90)}'
    }
    return Response(vitals)

@api_view(['GET'])
def get_location(request):
    # Simulate location data
    location = {
        'lat': 37.7749 + random.uniform(-0.01, 0.01),
        'lng': -122.4194 + random.uniform(-0.01, 0.01)
    }
    return Response(location)
