# Generated by Django 4.2.11 on 2024-04-10 22:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commune',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commune_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technology',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tech_name', models.CharField(max_length=100)),
                ('Antal_installationer', models.IntegerField()),
                ('Mojliga_installationer', models.IntegerField()),
                ('Kostnad_per_installation', models.FloatField()),
                ('Arlig_besparing_per_installation_SEK', models.FloatField()),
                ('slug', models.SlugField(blank=True, max_length=100)),
                ('commune_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='technologies', to='alternativkostnaderApp.commune')),
            ],
        ),
    ]
