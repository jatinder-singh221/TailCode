import base64
from datetime import datetime
from decouple import config
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.conf import settings

import pyotp

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, \
HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.parsers import FormParser, MultiPartParser

from .models import otpModel, userProfile
from .serilizers import userProfileSerializer, userRegisterSerializer, forgetPasswordSerializer, \
basicInfoUserSerializer, contactInfoSerializer, \
userProfileImageSerializer, passwordUpdateSerializer, helpSerializer, baseUserSerializer

class userProfileView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            user = userProfile.objects.get(user = request.user)
            query = userProfileSerializer(user)
            return Response(query.data, status = HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class keyGeneration:

    @staticmethod
    def generated(user) -> str:
        return str(user) + str(datetime.date(datetime.now())) + config('OTP')

class otpView(APIView):

    permission_classes  = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        username = kwargs['username']
        try:
            otp = otpModel.otpManager.get(username = username)
        except ObjectDoesNotExist:
            otpModel.otpManager.create(username = username)
            otp = otpModel.otpManager.get(username = username)

        finally:
            otp.counter += 1
            otp.isValid = False
            otp.save()

            keyGen = keyGeneration()
            key = base64.b32encode(keyGen.generated(username).encode())
            generatedOtp = pyotp.HOTP(key)

            subject = 'Thank you for registering with TailCode'
            message = f'''
                Your otp is {generatedOtp.at(otp.counter)} 
                Do not share your OTP with anyone
            '''
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [username]
            send_mail( subject, message, email_from, recipient_list )

            context = {'username': f'{kwargs["username"]}'}
            return Response(context, status = HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            username = kwargs['username']
            otp = otpModel.otpManager.get(username = username)
            keygen = keyGeneration()
            key = base64.b32encode(keygen.generated(username).encode())

            generatedOtp = pyotp.HOTP(key)

            if generatedOtp.verify(request.data["otp"], otp.counter):
                otp.isValid = True
                otp.save()
                return Response(status = HTTP_200_OK)

            else:
                return Response(status = HTTP_403_FORBIDDEN)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class userAvaliable(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):

        try:
            username = kwargs['username']
            User.objects.get(username = username)
            return Response(status = HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class registerView(CreateAPIView):
    serializer_class = userRegisterSerializer
    permission_classes = [permissions.AllowAny]


class forgetPasswordView(UpdateAPIView):
    serializer_class = forgetPasswordSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['put']

    def update(self, request, *args, **kwargs):
        try:
            serializedData = forgetPasswordSerializer(data = request.data)
            if serializedData.is_valid():
               username = serializedData.validated_data['username']
               password = serializedData.validated_data['password']

               getUserFromDatabase = User.objects.get(username = username)
               getUserFromDatabase.set_password(password)
               getUserFromDatabase.save()

               return Response(status = HTTP_200_OK)

            else:
                return Response(status = HTTP_403_FORBIDDEN)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

  

class basicInfoUpdateView(UpdateAPIView):
    serializer_class = basicInfoUserSerializer
    http_method_names = ['put']

    def get_object(self):
        user = self.request.user
        return user

class contactInfoUpdateView(UpdateAPIView):
    serializer_class = contactInfoSerializer
    http_method_names = ['put']


    def get_object(self):
        user = self.request.user
        instance = userProfile.objects.get(user = user)
        return instance

class profileImageUpdateView(UpdateAPIView):
    serializer_class = userProfileImageSerializer
    http_method_names = ['put']
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        user = self.request.user
        instance = userProfile.objects.get(user = user)
        return instance

class passwordUpdateView(UpdateAPIView):
    serializer_class = passwordUpdateSerializer
    http_method_names = ['put']

    def get_object(self):
        user = self.request.user
        return user

class helpView(CreateAPIView):
    serializer_class = helpSerializer
    permission_classes = [permissions.AllowAny]

class deleteUserView(DestroyAPIView):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = baseUserSerializer

    def get_object(self):
        user = self.request.user
        return user

