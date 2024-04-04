from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("verktyg", views.verktyg),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<int:commune_id>/', views.CommuneDetail.as_view()),
    path('commune/<int:commune_id>/<str:tech_name>/', views.TechDetail.as_view())
]

"path('commune/<int:commune_id>/<str:tech_name>', views.tech_detail)"