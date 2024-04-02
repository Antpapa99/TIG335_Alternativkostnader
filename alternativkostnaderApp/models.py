from django.db import models

class Commune(models.Model):
    commune_name = models.CharField(max_length=100)

class Technology(models.Model):
    commune_name = models.ForeignKey(Commune, related_name='technologies', on_delete=models.CASCADE)
    tech_name = models.CharField(max_length=100)
    value = models.IntegerField()

    class Meta:
        unique_together = ['tech_name', 'value']