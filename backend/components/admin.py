from django.contrib import admin

from .models import components, componentsCatagory

@admin.register(componentsCatagory)
class componentsCatagoryAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(components)
class componentsAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'catagory', 'isHidden', 'status']

