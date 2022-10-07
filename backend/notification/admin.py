from django.contrib import admin

from .models import notifications

@admin.register(notifications)
class notificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'seen', 'dated']
