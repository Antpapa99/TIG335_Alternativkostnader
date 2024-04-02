from rest_framework import serializers
from .models import *


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['tech_name', 'value']



class CommuneSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True)

    class Meta:
        model = Commune
        fields = ['commune_name', 'technologies']

    #This function allows us to create a new object which has a nested object
    def create(self, validated_data):
        technologies_data = validated_data.pop('technologies')
        commune_name = Commune.objects.create(**validated_data)
        for technology_data in technologies_data:
            Technology.objects.create(commune_name=commune_name, **technology_data)
        return commune_name
