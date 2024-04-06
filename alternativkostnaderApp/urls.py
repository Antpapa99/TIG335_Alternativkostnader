from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("data/", views.datainputpage),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<str:commune_name>', views.CommuneDetail.as_view()),  # Modified pattern
    path('commune/<str:commune_name>/<str:tech_name>', views.TechDetail.as_view()),  # Assuming tech_name is also a string
]

