from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, FileExtensionValidator


def imageUploadPath(instance, filename) -> str:
    return f'components/{filename}'

def catagoryUploadPath(instance, filename) -> str:
    return f'catarogy/{filename}'

class componentsCatagory(models.Model):
    name = models.CharField(max_length = 225, validators = [
        RegexValidator(
            regex = "^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$",
            message = 'Invalid name'
        )
    ], primary_key = True, unique = True)
    
    image = models.ImageField(
        upload_to = catagoryUploadPath,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png'],
                message =  'Only jpg, jpeg, png are allowed'
            )
        ],
        null = True
    )

    def __str__(self) -> str:
        return str(self.name)

    class Meta:
        verbose_name_plural = 'Component Catagories'

class components(models.Model):
    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name =  'componentsRelated',
        related_query_name = 'componentsQuery'
    )

    name = models.CharField(max_length = 225, validators = [
        RegexValidator(regex = "^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$", message = 'Invalid name')
    ])
    catagory = models.ForeignKey(
        componentsCatagory,
        on_delete = models.CASCADE,
        related_name =  'catagoryRelated',
        related_query_name = 'catagoryQuery'
    )
    image = models.ImageField(
        upload_to = imageUploadPath,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png'],
                message =  'Only jpg, jpeg, png are allowed'
            )
        ],
        null = True
    )
    code = models.TextField()
    STATUS = (
        ('Personal', 'Personal'),
        ('Public', 'Public'),
    )
    status = models.CharField(max_length = 10, default = 'Personal', choices=STATUS)
    isHidden = models.BooleanField()

    def __str__(self) -> str:
        return str(self.user)

    class Meta:
        verbose_name_plural = 'Components'
        ordering = ['-id']