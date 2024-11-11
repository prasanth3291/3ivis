# charts/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(DefaultUserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'username')
    ordering = ('email',)
