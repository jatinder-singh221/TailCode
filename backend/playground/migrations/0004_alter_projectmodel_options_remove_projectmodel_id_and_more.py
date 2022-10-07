# Generated by Django 4.0.4 on 2022-09-11 17:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playground', '0003_alter_projectmodel_directory'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectmodel',
            options={'verbose_name_plural': 'Projects'},
        ),
        migrations.RemoveField(
            model_name='projectmodel',
            name='id',
        ),
        migrations.AlterField(
            model_name='projectmodel',
            name='name',
            field=models.CharField(max_length=225, primary_key=True, serialize=False, unique=True, validators=[django.core.validators.RegexValidator(message='Only Letters', regex="^[a-z ,.'-]+$")]),
        ),
    ]
