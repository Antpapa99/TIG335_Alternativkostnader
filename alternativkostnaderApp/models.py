from django.db import models
from django.utils.text import slugify

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
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        # Remove unique constraint
        unique_together = None
    
    #Är relaterad till slug fältet, detta gör så att variabler med åäö eller mellan rum får urls som fungerar
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.tech_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.commune_name} - {self.tech_name}"