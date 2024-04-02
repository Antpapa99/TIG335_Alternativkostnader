from django.db import models

class Commune(models.Model):
    commune_name = models.CharField(max_length=100)

    def __str__(self):
        return self.commune_name

class Technology(models.Model):
    commune_name = models.ForeignKey(Commune, related_name='technologies', on_delete=models.CASCADE)
    tech_name = models.CharField(max_length=100)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.commune_name} - {self.tech_name}"