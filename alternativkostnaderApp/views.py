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

#Simple API call to get a list of communes in json or be able to add new objects with a direct API input

@api_view(['GET', 'POST'])
def commune_list(request):
    try:
        commune = Commune.objects.all()
    except Commune.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CommuneSerializer(commune, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CommuneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def commune_detail(request, id):
    try:
        commune = Commune.objects.get(pk=id)
    except Commune.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CommuneSerializer(commune)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CommuneSerializer(commune, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        pass






