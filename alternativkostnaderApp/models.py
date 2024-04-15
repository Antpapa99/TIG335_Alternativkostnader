from django.db import models
from django.utils.text import slugify

class Commune(models.Model):
    commune_name = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100, blank=True, null=True)


    def __str__(self):
        return self.commune_name

class Technology(models.Model):
    commune_name = models.ForeignKey(Commune, related_name='technologies', on_delete=models.CASCADE)
    tech_name = models.CharField(max_length=100)
    Antal_installationer = models.IntegerField()
    Mojliga_installationer = models.IntegerField()
    Kostnad_per_installation = models.FloatField()
    Arlig_besparing_per_installation_SEK = models.FloatField()
    slug = models.SlugField(max_length=100, blank=True)

    class Meta:
        # Remove unique constraint
        unique_together = None
    
    #Är relaterad till slug fältet, detta gör så att variabler med åäö eller mellan rum får urls som fungerar
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.tech_name)
            self.slug = base_slug
            counter = 1
            while Technology.objects.filter(commune_name=self.commune_name, slug=self.slug).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.commune_name} - {self.tech_name}"