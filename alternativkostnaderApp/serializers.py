from rest_framework import serializers
from .models import *


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'tech_name', 'Antal_installationer', 'Mojliga_installationer', 'Kostnad_per_installation', 
                  'Arlig_besparing_per_installation_SEK', 'Arlig_besparing_per_installation_HTE']
                  



class CommuneSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True)

    class Meta:
        model = Commune
        fields = ['id', 'commune_name', 'technologies']
    

    #This function allows us to create a new object which has a nested object
    def create(self, validated_data):
        technologies_data = validated_data.pop('technologies')
        commune_name = Commune.objects.create(**validated_data)
        for technology_data in technologies_data:
            Technology.objects.create(commune_name=commune_name, **technology_data)
        return commune_name
    
    #This here will probably need better variable names
    def update(self, instance, validated_data):
        technologies_data = validated_data.pop('technologies')

        #This here is the variable for technologies
        techs = (instance.technologies).all()
        techs = list(techs)
        #This here is the variabel for the commune name of the specific instance
        instance.commune_name = validated_data.get('commune_name', instance.commune_name)
        instance.save()

        #This is for each technology in the nested serializer
        for technology_data in technologies_data:
            if len(techs) < 1:
                technology = techs.pop(0)
                technology.tech_name = technology_data.get('tech_name', technology.tech_name)
                technology.Antal_installationer = technology_data.get('Antal_installationer', technology.Antal_installationer)
                technology.Mojliga_installationer = technology_data.get('Mojliga_installationer', technology.Mojliga_installationer)
                technology.Kostnad_per_installation = technology_data.get('Kostnad_per_installation', technology.Kostnad_per_installation)
                technology.Arlig_besparing_per_installation_SEK = technology_data.get('Arlig_besparing_per_installation_SEK', technology.Arlig_besparing_per_installation_SEK)
                technology.Arlig_besparing_per_installation_HTE = technology_data.get('Arlig_besparing_per_installation_HTE', technology.Arlig_besparing_per_installation_HTE)
                technology.save()
            else:
                Technology.objects.create(commune_name=instance, **technology_data)
        return instance 
    