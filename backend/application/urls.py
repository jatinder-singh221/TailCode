from django.urls import path
from .views import LoginView, HomeView, LogoutView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('', LoginView.as_view()),
    path('dashboard', login_required(HomeView.as_view(), login_url='/')),
    path('logout', LogoutView.as_view()),
]