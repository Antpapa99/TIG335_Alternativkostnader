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
    if request.method == 'GET':
        commune = Commune.objects.all()
        serializer = CommuneSerializer(commune, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommuneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def commune_detail(request, commune_id):
    try:
        commune = Commune.objects.get(pk=commune_id)
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
        commune.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def tech_detail(request, commune_id, tech_name):
    try:
        technology = Technology.objects.get(tech_name=tech_name, commune_name = commune_id)
    except Technology.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TechnologySerializer(technology)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TechnologySerializer(technology, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        technology.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






