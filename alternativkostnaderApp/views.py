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
    commune = CommuneTechnology.objects.all()
    serializer = CommuneTechnologySerializer(commune, many=True)
    return JsonResponse(serializer.data, safe=False)

