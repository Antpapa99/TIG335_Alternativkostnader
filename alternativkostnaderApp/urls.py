from django.urls import path

from . import views

urlpatterns = [
    path("", views.home),
    path("verktyg", views.verktyg),
    path('fetch_chart_data/', views.fetch_chart_data, name='fetch_chart_data'),
]