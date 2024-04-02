from django.db import models


class CommuneTechnology(models.Model):
    technology_name = models.CharField(max_length=200)
    total_installation = models.IntegerField()
    potential_installation = models.IntegerField()

class Commune(models.Model):
    commune_name = models.CharField(max_length=200)
    technologies = models.ManyToManyField(CommuneTechnology)


