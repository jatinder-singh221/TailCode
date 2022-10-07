from rest_framework import serializers

from .models import notifications

class notificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = notifications
        exclude = ['user', 'toUser', 'id']