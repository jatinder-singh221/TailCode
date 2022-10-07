from django.contrib import admin
from decouple import config
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path(config('ADMIN'), admin.site.urls),
    path('obtain/token', TokenObtainPairView.as_view()),
    path('refresh/token', TokenRefreshView.as_view()),

    path('authenciation/', include('authenciation.urls')),
    path('blog/', include('blog.urls')),
    path('components/', include('components.urls')),
    path('playground/', include('playground.urls')),
    path('notification/', include('notification.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)