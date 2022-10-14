from msilib.schema import Component
from django.views.generic import  View
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from django.contrib.auth.models import User
from authenciation.models import helpModel
from blog.models import blogPost
from components.models import componentsCatagory, components
from playground.models import projectModel


class LoginView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:   
            return redirect('/dashboard')
        context = {'username': ''}
        return render(request, 'Login.html', context)

    def post(self, request, *args, **kwargs):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            userGroup = user.groups.filter(name = 'admin').exists()
            if (request.user.is_superuser) or userGroup:
                login(request, user)
                return redirect('/dashboard')
            else:
                messages.error(request, 'Permission denied')
                context = {'username': username}
                return render(request, 'Login.html', context)
        else :
            messages.error(request, 'Invalid username or password')
            context = {'username': username}
            return render(request, 'Login.html', context)

class HomeView(View):

    def get(self, request, *args, **kwargs):
        helps = helpModel.objects.all()
        users = User.objects.all()
        blogs = blogPost.objects.all()
        component_catagories = componentsCatagory.objects.all()
        component = components.objects.all()
        projects = projectModel.objects.all()

        context = {
            'helps': helps,
            'users': users,
            'blogs': blogs,
            'component_catagories': component_catagories,
            'compoennts': component, 
            'projects': projects, 
        }

        return render(request, 'Home.html', context)

class LogoutView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            logout(request)
            return redirect('/')

        else:
            return redirect('/')