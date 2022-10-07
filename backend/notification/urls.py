from django.urls import path

from .views import getNotificationView

urlpatterns = [
    path('list/', getNotificationView.as_view())
]