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
    def get_Commune(self, commune_id):
        try:
            return Commune.objects.get(pk=commune_id)
        except Commune.DoesNotExist:
            raise Http404
    
    def get(self, request, commune_id, format=None):
        commune = self.get_Commune(commune_id)
        serializer = CommuneSerializer(commune)
        return Response(serializer.data)
        
    
    def put(self, request, commune_id, format=None):
        commune = self.get_Commune(commune_id)
        serializer = CommuneSerializer(commune, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, commune_id, format=None):
        commune = self.get_Commune(commune_id)
        commune.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TechDetail(APIView):
    def get_tech(self, commune_id, tech_name):
        try:
            return Technology.objects.get(tech_name=tech_name, commune_name=commune_id,)
        except Technology.DoesNotExist:
            raise Http404
    
    def get(self, request, commune_id, tech_name, format=None):
        technology = self.get_tech(commune_id, tech_name)  # Pass both commune_id and tech_name
        serializer = TechnologySerializer(technology)
        return Response(serializer.data)
        
    
    def put(self, request, commune_id, tech_name, format=None):
        technology = self.get_tech(commune_id, tech_name)
        serializer = TechnologySerializer(technology, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, commune_id, tech_name, format=None):
        technology = self.get_Commune(commune_id, tech_name)
        technology.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    








