from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import tasks
from .serializer import TodoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.

class AddTasks(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    # return only logged-in user's tasks
    def get_queryset(self):
        return tasks.objects.filter(user=self.request.user)
    
    #automatically attach logged-in user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UpdateTask(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        # ✅ user can access ONLY their own tasks
        return tasks.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

