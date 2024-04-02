from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("verktyg", views.verktyg),
    path('commune/', views.testrequest),
]