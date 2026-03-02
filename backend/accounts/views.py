from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.generics import ListCreateAPIView
from .serializer import Register
from django.contrib.auth.models import User

# Create your views here.
class RegisterUser(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class= Register



