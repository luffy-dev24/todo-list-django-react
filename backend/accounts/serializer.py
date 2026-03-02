from django.contrib.auth.models import User
from rest_framework import serializers

class Register(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email","password"]
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']  # create_user hashes it automatically
        )
        return user