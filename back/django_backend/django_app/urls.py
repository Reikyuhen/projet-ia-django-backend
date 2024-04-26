from django.urls import path
from .views import *

urlpatterns = [
    path('predict/', prediction_view, name='prediction_view'),
    path('lung/', lung_view, name='lung_view'),
]
