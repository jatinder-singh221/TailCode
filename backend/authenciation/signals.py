from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Group

from .models import userProfile

@receiver(post_save, sender = User)
def createUserProfile(sender, created, instance, *args, **kwargs):

    if created:
        userProfile.objects.create(user = instance)
        group = Group.objects.get(id = 1) # user group by default
        instance.groups.add(group)

    elif created == False:
        getProfile = userProfile.objects.select_related('user').filter(user = instance).exists()

        if (getProfile == False):
            userProfile.objects.create(user = instance)   