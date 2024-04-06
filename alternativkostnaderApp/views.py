from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return render(request, 'index.html')

def datainputpage(request):
    return render(request, 'data.html')

#Simple API call to get a list of communes in json or be able to add new objects with a direct API input

class CommuneList(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    
    def get(self, request, format=None):
        commune = Commune.objects.all()
        serializer = CommuneSerializer(commune, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CommuneSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommuneDetail(APIView):
    def get_Commune(self, commune_name):
        try:
            return Commune.objects.get(commune_name=commune_name)
        except Commune.DoesNotExist:
            raise Http404
    
    def get(self, request, commune_name, format=None):
        commune = self.get_Commune(commune_name)
        serializer = CommuneSerializer(commune)
        return Response(serializer.data)
        
    
    def put(self, request, commune_name, format=None):
        commune = self.get_Commune(commune_name)
        serializer = CommuneSerializer(commune, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, commune_name, format=None):
        commune = self.get_Commune(commune_name)
        commune.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TechDetail(APIView):
    def get_tech(self, commune_name, tech_name):
        print("Commune Name:", commune_name)
        print("Tech Name:", tech_name)
        try:
            return Technology.objects.get(tech_name=tech_name, commune_name=commune_name)
        except Technology.DoesNotExist:
            raise Http404
    
    def get(self, request, commune_name, tech_name, format=None):
        technology = self.get_tech(commune_name, tech_name)
        serializer = TechnologySerializer(technology)
        return Response(serializer.data)
        
    
    def put(self, request, commune_name, tech_name, format=None):
        technology = self.get_tech(commune_name, tech_name)
        serializer = TechnologySerializer(technology, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, commune_name, tech_name, format=None):  # Change parameter name to commune_name
        technology = self.get_tech(commune_name, tech_name)
        technology.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    








