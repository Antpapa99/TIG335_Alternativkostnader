from rest_framework import serializers
from .models import *



class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'tech_name', 'Antal_installationer', 'Mojliga_installationer', 'Kostnad_per_installation', 
                  'Arlig_besparing_per_installation_SEK', 'slug']
                  



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

        existing_technologies = instance.technologies.all()
        existing_techs_names = set(tech.tech_name for tech in existing_technologies)

        instance.commune_name = validated_data.get('commune_name', instance.commune_name)
        instance.save()

        for technology_data in technologies_data:
            tech_name = technology_data.get('tech_name')

            if tech_name in existing_techs_names:
            # If a technology with the same name exists, update it
                technology = next(tech for tech in existing_technologies if tech.tech_name == tech_name)
                for attr, value in technology_data.items():
                    setattr(technology, attr, value)
                    technology.save()
            else:
            # Otherwise, create a new technology
                Technology.objects.create(commune_name=instance, **technology_data)

        return instance

    