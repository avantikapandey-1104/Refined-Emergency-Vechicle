from django.db import models

class Vitals(models.Model):
    ecg = models.JSONField()
    oxygen = models.IntegerField()
    bp = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)

class Location(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class QoD(models.Model):
    status = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
