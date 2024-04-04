from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


def home(request):
    return render(request, 'index.html')

def verktyg(request):
    return render(request, 'verktyg.html')

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
    def get_Commune(self, pk):
        try:
            return Commune.objects.get(pk=pk)
        except Commune.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        commune = self.get_Commune(pk)
        serializer = CommuneSerializer(commune)
        return Response(serializer.data)
        
    
    def put(self, request, pk, format=None):
        commune = self.get_Commune(pk)
        serializer = CommuneSerializer(commune, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        commune = self.get_Commune(pk)
        commune.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    








