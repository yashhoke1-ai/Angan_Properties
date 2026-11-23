from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health'),
    path('csrf/', views.csrf_token, name='csrf'),
]