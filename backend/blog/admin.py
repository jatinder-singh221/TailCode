from django.contrib import admin
from .models import blogPost

@admin.register(blogPost)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_on', 'updated_on', 'status']
    list_display_links = ['title', 'author', 'created_on', 'updated_on', 'status']
    readonly_fields = ['created_on', 'updated_on']
