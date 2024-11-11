# charts/views.py
from rest_framework import generics, permissions
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Set permissions here, not in the serializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer



class ChartDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        data = {
            "values": [3.5, 6.0, 8.5, 5.0, 7.3, 4.8, 9.1, 10.2, 3.9, 7.7, 6.4, 8.9, 5.5, 9.7, 4.3, 11.1, 7.8, 6.6, 5.3, 8.2]
        }
        return Response(data)