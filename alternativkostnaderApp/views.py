from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


def home(request):
    return render(request, 'index.html')

def verktyg(request):
    return render(request, 'verktyg.html')

@api_view(['GET', 'POST'])
def commune_list(request):
    if request.method == 'GET':
        commune = Commune.objects.all()
        serializer = CommuneSerializer(commune, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        serializer = CommuneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)


