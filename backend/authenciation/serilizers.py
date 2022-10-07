from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField

from .models import userProfile, helpModel

class groupNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']

class baseUserSerializer(serializers.ModelSerializer):
    groups = groupNameSerializer(many = True)
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'groups', 'email']

class userProfileSerializer(serializers.ModelSerializer):
    country = SerializerMethodField()
    gender = SerializerMethodField()
    userStatus = SerializerMethodField()
    user = baseUserSerializer()

    class Meta:
        model = userProfile
        fields = ['user', 'country', 'userProfileImage', 'number', 'userStatus', 'gender']

    def get_country(self, obj):
        return obj.getCountry()

    def get_gender(self, obj):
        return obj.getGender()

    def get_userStatus(self, obj):
        return obj.getStatus()

class userRegisterSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'confirmPassword']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPassword']:
            raise ValidationError(
                {
                    'password': 'Password Mismatch',
                    'confirmPassword': 'Confirm Password Mismatch'
                }
            )
        validate_password(attrs['password'], self.instance)
        return attrs

    def create(self, validated_data):
        user = validated_data['username']
        password = validated_data['password']
        user = User.objects.create(username=user)
        user.set_password(password)
        user.save()
        return user

class forgetPasswordSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    confirmPassword = serializers.CharField(required=True, write_only=True) 

    def validate(self, attrs):

        if attrs['password'] != attrs['confirmPassword']:
            raise ValidationError('password mismatch')

        validate_password(attrs['password'], self.instance)

        return attrs


class basicInfoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']

class contactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = userProfile
        fields = ['country', 'number', 'userStatus', 'gender']

class userProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = userProfile
        fields = ['userProfileImage']

    def update(self, instance, validated_data):
        instance.userProfileImage.delete(save = True)
        return super().update(instance, validated_data)

class passwordUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    confirmPassword = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'confirmPassword'] 

    def validate(self, attrs):

        if attrs['password'] != attrs['confirmPassword']:
            raise ValidationError('password mismatch')

        validate_password(attrs['password'], self.instance)

        return attrs

    def update(self, instance, validated_data):
        password = validated_data['password']
        user = User.objects.get(username = instance)
        user.set_password(password)
        user.save()

        return user

class helpSerializer(serializers.ModelSerializer):
    class Meta:
        model = helpModel
        fields = '__all__'