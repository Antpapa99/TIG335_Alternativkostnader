from rest_framework import serializers
from .models import *

class CommuneTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommuneTechnology
        fields = ['technology_name', 'total_installation', 'potential_installation']

class CommuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commune
        fields = ['id', 'commune_name', 'technologies']

