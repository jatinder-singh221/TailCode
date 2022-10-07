from wsgiref.util import FileWrapper
from decouple import config
import shutil 
import os
import docker
import random
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT ,\
HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST

from .models import projectModel
from .serializer import playgroundNameSerializer, playgroundLCURDSerializer
from django.http import HttpResponse

# folders
def directoryData(path) -> dict:

    if os.path.exists(path):
        data = {'name': os.path.basename(path)}
        if os.path.isdir(path):
            data['type'] = 'directory'
            data['src'] = path
            data['children'] = [directoryData(os.path.join(path, subPath)) for subPath in os.listdir(path)]
        else:
            data['type'] = 'file'
            data['src'] = path 

        return data
    

class directoryView(APIView):

    def get(self, request, *args, **kwargs):
        
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            data = directoryData(query.directory)

            if data:
                return Response(data, status = HTTP_200_OK)
            else:
                raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)


class addFolderView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']
            name = request.data['name']

            if os.path.exists(os.path.join(path, name)):
                return Response(status = HTTP_409_CONFLICT)
            else:
                os.mkdir(os.path.join(path, name))
                data = directoryData(query.directory)
                return Response(data, status = HTTP_201_CREATED)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)
        
        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class deleteFolderView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']

            if os.path.exists(path):
                os.rmdir(path)
                data = directoryData(query.directory)
                return Response(data, status = HTTP_202_ACCEPTED)

            else:
                raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)


# files

class fileView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']

            if os.path.exists(path):
                with open(path, 'r') as file:
                    data = file.read()
                return Response(data, status = HTTP_200_OK)
            else:
                raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class addFileView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']
            name = request.data['name']

            if os.path.exists(os.path.join(path, name)):
                return Response(status = HTTP_409_CONFLICT)
            else:
                with open(os.path.join(path, name) , 'a+') as file:
                    file.close()
                data = directoryData(query.directory)
                return Response(data, status = HTTP_201_CREATED)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class deleteFileView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']

            if os.path.exists(path):
                os.remove(path)
                data = directoryData(query.directory)
                return Response(data, status = HTTP_202_ACCEPTED)
            else:
                raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)


# comman
class renameView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']
            renamePath = request.data['rename']

            if os.path.exists(path):
                os.rename(path, renamePath)
                data = directoryData(query.directory)
                return Response(data, status = HTTP_200_OK)

            else:
                raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class writeInFileView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            path = request.data['path']
            value = request.data['value']

            if os.path.exists(os.path.join(path)):
                with open(path , 'w') as file:
                    file.write(value)
                    file.close()    
                return Response(status = HTTP_200_OK)

            raise ObjectDoesNotExist

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class updateNameView(UpdateAPIView):
    serializer_class = playgroundNameSerializer
    http_method_names = ['patch']
    lookup_field = 'name'

    def get_queryset(self):
        query = projectModel.objects.filter(name = self.kwargs['name'], user = self.request.user, isDeleted = False)
        return query

class playgroundLCURDView(viewsets.ModelViewSet):
    serializer_class = playgroundNameSerializer

    def get_queryset(self):
        user = self.request.user
        query = projectModel.objects.select_related('user').filter(user = user ,isDeleted = False)
        return query

    def create(self, request, *args, **kwargs):
        postedData = playgroundNameSerializer(data = request.data)
        if postedData.is_valid():
            name = postedData.validated_data['name']
            framework = postedData.validated_data['framework']
            user = request.user
            source = config('source')+framework
            destination = config('destination')+name
            folderPath = shutil.copytree(source, destination) 
            data = projectModel.objects.create(
                user = user,
                name = name,
                directory = folderPath,
                framework = framework
            )
            data.save()
            return Response(status = HTTP_201_CREATED)
        else:
            return Response(postedData.errors, status = HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            object = self.get_object()
            object.isDeleted = True
            object.save()
            return Response(status = HTTP_202_ACCEPTED)
        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class checkPlaygroundName(APIView):
    permission_classes = [permissions.AllowAny]    
    
    def get(self, request, *args, **kwargs):
        try:
            name = kwargs['name']
            isUsed = projectModel.objects.filter(name = name).exists()
            if not isUsed:                
                return Response(status = HTTP_202_ACCEPTED)
            else:
                return Response(status = HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class downloadFolder(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            name = kwargs['name']
            query = projectModel.objects.get(name = name)
            pathOfArchive = config('pathOfArchive')
            directoryPath = query.directory
            fileArchive = shutil.make_archive(pathOfArchive, 'zip', directoryPath)
            response = HttpResponse(FileWrapper(open(fileArchive,'rb')), content_type='application/zip')
            response['Content-Disposition'] = 'attachment; filename="{filename}.zip"'.format(
                filename = name
            )
            return response
        except ObjectDoesNotExist:
            return Response(status = HTTP_404_NOT_FOUND)
        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)


class startContainer(APIView):
    def get(self, request, *args, **kwargs):
        try:
            query = projectModel.objects.get(name = kwargs['name'], user = request.user, isDeleted = False)
            framework = query.framework
            client = docker.from_env()
            randomPort = random.randrange(49152, 65535)
            directory = query.directory + '\\\\src'
            if framework == 'next':
                container = client.containers.run('next', detach = True, ports={3000:randomPort}, volumes={directory: {'bind': '/src/src'}})
                context = {'port': randomPort, 'containerId': container.id, 'url':'http://localhost'}
            elif framework == 'reactjs':
                container = client.containers.run('reactjs', detach = True, ports={3000:randomPort}, volumes={directory: {'bind': '/src/src'}})
                context = {'port': randomPort, 'containerId': container.id, 'url':'http://localhost'}
            return Response(context, status = HTTP_200_OK)

        except Exception:
            return Response(status = HTTP_400_BAD_REQUEST)

class restartContainer(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        try:
            client = docker.from_env()
            contianer = client.containers.get(kwargs['id'])
            contianer.restart()
            return Response(HTTP_200_OK)
        except:
            return Response(status = HTTP_400_BAD_REQUEST)

class deleteContainer(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        try:
            client = docker.from_env()
            contianer = client.containers.get(kwargs['id'])
            contianer.stop()
            return Response(HTTP_200_OK)
        except:
            return Response(status = HTTP_400_BAD_REQUEST)

