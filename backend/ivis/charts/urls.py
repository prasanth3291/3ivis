from django.urls import path
from .views import UserRegistrationView,CustomTokenObtainPairView,ChartDataAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),  # Registration endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT token refresh
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('chart-data/', ChartDataAPIView.as_view(), name='chart-data'),
     
]
