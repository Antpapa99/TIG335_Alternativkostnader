from rest_framework import serializers
from .models import *



class CommuneSerializer(serializers.ModelSerializer):
    technologies = serializers.StringRelatedField(many=True)

    class Meta:
        model = Commune
        fields = ['commune_name', 'technologies']