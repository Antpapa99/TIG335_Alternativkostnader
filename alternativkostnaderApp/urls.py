from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("verktyg", views.verktyg),
    path('commune/', views.commune_list),
    path('commune/<int:commune_id>', views.commune_detail),
    path('commune/<int:commune_id>/<int:tech_id>', views.tech_detail)
]