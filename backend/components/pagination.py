from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class componentsPagination(PageNumberPagination):
    page_size = 4

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'page': self.get_page_number(self.request, self),
            'count': self.page.paginator.num_pages,
            'results': data
        })