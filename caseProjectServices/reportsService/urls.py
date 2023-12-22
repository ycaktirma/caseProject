# urls.py

from django.urls import path
from .views import reportView

urlpatterns = [
    path('', reportView , name='reports-list'),
]
