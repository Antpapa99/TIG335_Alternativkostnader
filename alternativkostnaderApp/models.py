from django.db import models

class Commune(models.Model):
    commune_name = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    
    

    def __str__(self):
        return self.name

class CommuneTechnology(models.Model):
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE)
    total_installation = models.IntegerField()
    potential_installation = models.IntegerField()

    def __str__(self):
        return f"{self.commune.name} - {self.technology.name}"

