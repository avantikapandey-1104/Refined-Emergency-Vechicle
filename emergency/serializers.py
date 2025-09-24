from rest_framework import serializers
from .models import Vitals, Location, QoD

class VitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vitals
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class QoDSerializer(serializers.ModelSerializer):
    class Meta:
        model = QoD
        fields = '__all__'
