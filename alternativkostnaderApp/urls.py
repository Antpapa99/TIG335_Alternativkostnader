from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("data/", views.datainputpage),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<str:commune_name>', views.CommuneDetail.as_view()),
    path('commune/<str:commune_name>/<slug:tech_slug>', views.TechDetail.as_view()),
]

