from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK

from .serializers import notificationSerializer

class getNotificationView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            get_object = user.notifyUserRelated.all()

            if len(get_object) > 0:
                query = notificationSerializer(get_object, many = True)
                return Response(query.data, status = HTTP_200_OK)

            raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)
