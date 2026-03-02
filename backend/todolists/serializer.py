from rest_framework import serializers
from .models import tasks
from .models import tasks

class TodoSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = tasks
        fields = ["id", "title", "time", "user"]