from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator, RegexValidator

from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

def profileUploadPath(instance, filename) -> str:
    return f'profile/{instance}-{filename}'

class userProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        related_name =  'userRelated',
        related_query_name = 'userQuery'
    )

    userProfileImage = models.ImageField(
        upload_to = profileUploadPath,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png'],
                message =  'Only jpg, jpeg, png are allowed'
            )
        ],
        null = True
    )

    country = CountryField()
    number = PhoneNumberField()

    ABOUT = [
        ('su', 'Student'),
        ('te', 'Teacher'),
        ('fullt', 'Full time job'),
        ('part', 'Part time job'),
        ('o', 'Other'),
    ]
    userStatus = models.CharField(max_length = 225, choices=ABOUT)

    GENDER = [
        ('m', 'Male'),
        ('f', 'Female'),
        ('o', 'Other'),
    ]
    gender = models.CharField(max_length = 225, choices = GENDER)


    def __str__(self) -> str:
        return str(self.user)

    def getCountry(self) -> str:
        name = self.get_country_display()
        return str(name)

    def getGender(self) -> str:
        name = self.get_gender_display()
        return str(name)

    def getStatus(self) -> str:
        name = self.get_userStatus_display()
        return str(name)

    class Meta:
        db_table = 'profiles'
        verbose_name_plural = "Profiles"


class otpModel(models.Model):
    username = models.EmailField(max_length = 225)
    counter = models.IntegerField(default = 0)
    isValid = models.BooleanField(default = False)

    otpManager = models.Manager()
    
    def __str__(self) -> str:
        return str(self.username)

    class Meta:
        db_table = 'OTP'
        verbose_name_plural = "OTP"

class helpModel(models.Model):
    username = models.EmailField()
    detail = models.TextField(validators = [
        RegexValidator(
            regex = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$',
            message = 'Only letter, number'
        )
    ])

    class Meta:
        db_table = 'help'
        verbose_name_plural = 'Help'
