from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import componentsCatagoryView, componentsCatagoryDetailView, componentLCURDView, \
componentSearchView

router = DefaultRouter()
router.register(r'', componentLCURDView, basename = 'components' )

urlpatterns = [
    path('list', componentsCatagoryView.as_view()),
    path('search', componentSearchView.as_view()),
    path('<str:catagory>', componentsCatagoryDetailView.as_view()),
    path('', include(router.urls))
]