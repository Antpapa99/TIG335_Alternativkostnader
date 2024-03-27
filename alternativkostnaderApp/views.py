from django.http import HttpResponse
from django.shortcuts import render
import json


def home(request):
    return render(request, 'index.html')

def verktyg(request):
    # Dummy data for demonstration
    data = {
        'labels': ['A', 'B', 'C'],
        'values': [30, 40, 30]
    }
    return render(request, 'verktyg.html', {'chartData': data})