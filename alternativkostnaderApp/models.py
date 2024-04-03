from django.db import models

class Commune(models.Model):
    commune_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.commune_name

class Technology(models.Model):
    commune_name = models.ForeignKey(Commune, related_name='technologies', on_delete=models.CASCADE)
    tech_name = models.CharField(max_length=100)
    Antal_installationer = models.IntegerField()
    Mojliga_installationer = models.IntegerField()
    Kostnad_per_installation = models.FloatField()
    Arlig_besparing_per_installation_SEK = models.FloatField()
    Arlig_besparing_per_installation_HTE = models.IntegerField()

    class Meta:
        # Remove unique constraint
        unique_together = None

    def __str__(self):
        return f"{self.commune_name} - {self.tech_name}"