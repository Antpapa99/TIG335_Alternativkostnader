from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
import json


def home(request):
    return render(request, 'index.html')

def verktyg(request):
    return render(request, 'verktyg.html')

def testrequest(request):
    commune = Commune.objects.all()
    serializer = CommuneSerializer(commune, many=True)
    return JsonResponse({"commune":serializer.data}, safe=False)

