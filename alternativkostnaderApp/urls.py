from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("data/", views.datainputpage),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<slug:commune_slug>', views.CommuneDetail.as_view()),
    path('commune/<slug:commune_slug>/<slug:tech_slug>', views.TechDetail.as_view()),
]

