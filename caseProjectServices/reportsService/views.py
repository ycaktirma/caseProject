from django.shortcuts import render
from django.http import HttpResponse
from .services import report
import json

# Create your views here.
def reportView(request):

    #Call the report service function and return the results
    responseRaw = report()
    #Convert to json
    json_response = json.dumps(responseRaw)
    return HttpResponse(json_response)