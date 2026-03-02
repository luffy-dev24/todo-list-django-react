from django.urls import path
from .views import *

urlpatterns =[
    path('addtask/',AddTasks.as_view(),name="addtasks"),
    path("update/<int:pk>/",UpdateTask.as_view(),name="update_task")
]