# Generated by Django 4.2.11 on 2024-04-02 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "alternativkostnaderApp",
            "0002_remove_commune_technologies_technology_commune_name_and_more",
        ),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="technology",
            unique_together=set(),
        ),
    ]