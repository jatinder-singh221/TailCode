from dataclasses import field
from rest_framework import serializers

from .models import projectModel

class playgroundNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = projectModel
        fields = ['name', 'framework']

class playgroundLCURDSerializer(serializers.ModelSerializer):
    class Meta:
        model = projectModel
        exclude = ['isDeleted', 'downloadCounter', 'shared', 'user']