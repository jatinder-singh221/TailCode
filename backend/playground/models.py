from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


class projectModel(models.Model):
    user = models.ForeignKey(
        User, on_delete = models.CASCADE, 
        related_name = 'userProjectRelated',
        related_query_name = 'userProjectQuery'
    )
    name = models.CharField(
        max_length = 225,
        validators = [
            RegexValidator(regex="^[a-z ,.'-]+$", message = 'Only Letters')
        ], primary_key = True,
        unique = True
    )
    directory = models.CharField(
        max_length = 225, 
        validators = [
            RegexValidator(regex = '^.*(\\\\.*)$', message='Invalid Name')
        ], blank = True, null = True
    )
    framework = models.CharField(max_length = 225, default='')
    isDeleted = models.BooleanField(default = False)
    downloadCounter = models.IntegerField(null = True, blank = True)
    shared = models.BooleanField(default = False)

    def __str__(self) -> str:
        return str(self.name)

    class Meta:
        verbose_name_plural = 'Projects'


