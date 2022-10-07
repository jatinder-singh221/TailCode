from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField

from .models import blogPost

class blogListSerializer(serializers.ModelSerializer):
    author = SerializerMethodField()
    class Meta:
        model = blogPost
        fields = ['author', 'title', 'description', 'created_on', 'slug', 'banner']

    def get_author(self, obj):
        return obj.getAuthorName()

class blogPostSerializer(serializers.ModelSerializer):
    status = SerializerMethodField()
    author = SerializerMethodField()

    class Meta:
        model = blogPost
        exclude = ['id']

    def get_status(self, obj):
        return obj.getDispalyName()

    def get_author(self, obj):
        return obj.getAuthorName()

class blogLCURDSerializer(serializers.ModelSerializer):

    class Meta:
        model = blogPost
        exclude = ['author']
