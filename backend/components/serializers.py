from dataclasses import field
from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField

from .models import componentsCatagory, components

class componentsCatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = componentsCatagory
        fields = '__all__'

class componentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = components
        exclude = ['isHidden', 'user']
