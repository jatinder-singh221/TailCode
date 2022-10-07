from email.mime import base
from django.urls import path, include
from .views import directoryView, fileView, addFolderView, addFileView, \
deleteFolderView, deleteFileView, renameView, writeInFileView, updateNameView, playgroundLCURDView ,\
checkPlaygroundName, downloadFolder, startContainer, restartContainer, deleteContainer

from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register(r'', playgroundLCURDView, basename = 'playground')

urlpatterns = [
    #folders urls
    path('<str:name>/directory', directoryView.as_view()),
    path('<str:name>/add/folder', addFolderView.as_view()),
    path('<str:name>/delete/folder', deleteFolderView.as_view()),

    # files urls
    path('<str:name>/file', fileView.as_view()),
    path('<str:name>/add/file', addFileView.as_view()),
    path('<str:name>/delete/file', deleteFileView.as_view()),

    # comman
    path('<str:name>/rename', renameView.as_view()),
    path('', include(router.urls)),
    path('<str:name>/check', checkPlaygroundName.as_view()),
    path('<str:name>/download',downloadFolder.as_view ()),
    
    # operation
    path('<str:name>/write', writeInFileView.as_view()),
    path('<str:name>/update', updateNameView.as_view()),

    # container
    path('<str:name>/startContainer', startContainer.as_view()),
    path('<str:id>/restartContainer', restartContainer.as_view()),
    path('<str:id>/deleteContainer', deleteContainer.as_view()),
]