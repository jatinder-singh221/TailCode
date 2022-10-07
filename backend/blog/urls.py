from email.mime import base
from django.urls import path, include
from .views import blogPostListView, blogPostDetailView, blogLCURDView, blogNameAvaliable

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', blogLCURDView, basename = 'blog')

urlpatterns = [
    path('list', blogPostListView.as_view()),
    path('<str:slug>', blogPostDetailView.as_view()),
    path('', include(router.urls)), # blogs post admin
    path('<str:title>/blog', blogNameAvaliable.as_view())
]