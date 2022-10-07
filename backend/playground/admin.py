from django.contrib import admin
from .models import projectModel


@admin.register(projectModel)
class projectAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'directory', 'framework', 'isDeleted']
    list_display_links = ['user', 'name', 'directory']
