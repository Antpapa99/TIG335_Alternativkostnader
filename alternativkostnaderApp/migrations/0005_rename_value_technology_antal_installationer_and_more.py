# Generated by Django 4.2.11 on 2024-04-02 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("alternativkostnaderApp", "0004_alter_commune_commune_name"),
    ]

    operations = [
        migrations.RenameField(
            model_name="technology",
            old_name="value",
            new_name="Antal_installationer",
        ),
        migrations.AddField(
            model_name="technology",
            name="Kostnad_per_installation",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="technology",
            name="Mojliga_installationer",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="technology",
            name="Årlig_besparing_per_installation_HTE",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="technology",
            name="Årlig_besparing_per_installation_SEK",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
