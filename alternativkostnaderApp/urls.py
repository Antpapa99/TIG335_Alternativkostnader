from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("data/", views.datainputpage),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<int:commune_id>', views.CommuneDetail.as_view()),
    path('commune/<int:commune_id>/<str:tech_name>', views.TechDetail.as_view()),
]

