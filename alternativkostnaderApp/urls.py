from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("data/", views.datainputpage),
    path('commune/', views.CommuneList.as_view()),
    path('commune/<int:commune_id>', views.CommuneDetail.as_view(), name = "commune_detail"),
    path('commune/<str:commune_name>', views.RedirectCommuneDetail.as_view(), name='redirect_commune_detail'),
    path('commune/<int:commune_id>/<str:tech_name>', views.TechDetail.as_view()),
    path('commune/<str:commune_name>/<str:tech_name>', views.RedirectTechDetail.as_view(), name ='tech_detail')
]

