# Generated by Django 4.0.4 on 2022-09-24 15:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0002_components_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='components',
            options={'ordering': ['-id'], 'verbose_name_plural': 'Components'},
        ),
    ]
