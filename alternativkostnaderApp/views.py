from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
import json


def home(request):
    return render(request, 'index.html')

def verktyg(request):
    return render(request, 'verktyg.html')

def fetch_chart_data(request):
    # Dummy data for demonstration
    data = {
        'labels': ['A', 'B', 'C'],
        'values': [30, 40, 30]
    }
    return JsonResponse(data)