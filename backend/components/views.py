from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework import filters
from rest_framework import viewsets

from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .serializers import componentsCatagorySerializer, componentsSerializer
from .models import componentsCatagory, components
from .pagination import componentsPagination

class componentsCatagoryView(ListAPIView):
    permission_classes  = [permissions.AllowAny]
    serializer_class = componentsCatagorySerializer
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]
    queryset = componentsCatagory.objects.all()

    @method_decorator(cache_page(60 * 2))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class componentsCatagoryDetailView(ListAPIView):
    permission_classes  = [permissions.AllowAny]
    serializer_class = componentsSerializer
    pagination_class = componentsPagination

    def get_queryset(self):
        name = self.kwargs['catagory']
        queryset = components.objects.select_related('catagory').filter(isHidden = False, catagory = name, status = 'Public')
        return queryset

    @method_decorator(cache_page(60* 2))
    def get(self, request, *args, **kwargs):
        return  super().get(request, *args, **kwargs)

class componentLCURDView(viewsets.ModelViewSet):
    serializer_class = componentsSerializer
    lookup_field = 'id'
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        query = user.componentsRelated.all().filter(isHidden = False)
        return query

    def create(self, request, *args, **kwargs):
        try:
            data = componentsSerializer(data = request.data)
            if data.is_valid():
                user = request.user
                data.save(user = user, isHidden = False)
                return Response(data.data, status = HTTP_201_CREATED)
            return Response(data.errors ,status = HTTP_400_BAD_REQUEST )
        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST )

class componentSearchView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = componentsSerializer
    search_fields = ['name', 'catagory__name']
    filter_backends = [filters.SearchFilter]
    queryset = components.objects.all().filter(isHidden = False, status = 'Public')

    @method_decorator(cache_page(60* 2))
    def get(self, request, *args, **kwargs):
        return  super().get(request, *args, **kwargs)
