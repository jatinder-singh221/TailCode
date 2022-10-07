from django.contrib import admin

from .models import userProfile, otpModel, helpModel

@admin.register(userProfile)
class userProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'country', 'number', 'gender', 'userStatus']
    list_display_links = ['user', 'country', 'number', 'gender', 'userStatus']

@admin.register(otpModel)
class otpModelAdmin(admin.ModelAdmin):
    list_display = ['username', 'counter', 'isValid']
    list_display_links = ['username', 'counter']

@admin.register(helpModel)
class helpModelAdmin(admin.ModelAdmin):
    list_display = ['username', 'detail']
    list_display_links = ['username', 'detail']