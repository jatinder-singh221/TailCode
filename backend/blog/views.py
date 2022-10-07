from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import filters
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import permissions, viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND 

from rest_framework.parsers import FormParser, MultiPartParser

from .serializers import blogLCURDSerializer, blogPostSerializer, blogListSerializer
from .models import blogPost
from .pagination import blogPagination

class blogPostListView(ListAPIView):
    permission_classes  = [permissions.AllowAny]
    serializer_class = blogListSerializer
    pagination_class = blogPagination
    search_fields = ['title', 'description']
    filter_backends = [filters.SearchFilter]
    queryset = blogPost.objects.all().filter(status = 'P')

    @method_decorator(cache_page(60* 2))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class blogPostDetailView(RetrieveAPIView):
    permission_classes  = [permissions.AllowAny]
    serializer_class = blogPostSerializer
    queryset = blogPost.objects.all().filter(status = 'P')
    lookup_field = 'slug'

    @method_decorator(cache_page(60* 2))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class blogLCURDView(viewsets.ModelViewSet): # list created update remove and delete view
    serializer_class = blogLCURDSerializer
    lookup_field = 'slug'
    pagination_class = blogPagination
    parser_classes = [MultiPartParser, FormParser]

   
    def get_queryset(self):
        user = self.request.user
        query = user.blogRelated.all().filter(Q(status = 'P') | Q(status = 'D') | Q(status = 'H'))
        return query


    def create(self, request, *args, **kwargs):
        try:
            data = blogLCURDSerializer(data = request.data)
            if data.is_valid():
                user = request.user
                data.save(author = user)
                return Response(data.data, status = HTTP_201_CREATED)
            return Response(data.errors ,status = HTTP_400_BAD_REQUEST )
        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST )

class blogNameAvaliable(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):

        try:
            title = kwargs['title']
            blogPost.objects.get(title = title)
            return Response(status = HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)




    
    
