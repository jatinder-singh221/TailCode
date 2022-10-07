from django.urls import path

from .views import userProfileView, forgetPasswordView, otpView, registerView, userAvaliable,  \
forgetPasswordView, userProfileView, basicInfoUpdateView, \
contactInfoUpdateView, profileImageUpdateView, passwordUpdateView, helpView

urlpatterns = [
    path('profile', userProfileView.as_view()),

    path('<str:username>/user', userAvaliable.as_view()),
    path('<str:username>/otp', otpView.as_view()),

    path('user/update/basicinfo', basicInfoUpdateView.as_view()),
    path('user/update/contactinfo', contactInfoUpdateView.as_view()),
    path('user/update/profile', profileImageUpdateView.as_view()),
    path('user/update/password', passwordUpdateView.as_view()),
    
    path('user/register', registerView.as_view()),
    path('user/forget', forgetPasswordView.as_view()),
    path('user/help', helpView.as_view()),
]