from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


@api_view(['GET'])
def health_check(request):

    return Response({
        'status': 'success',
        'message': 'Property Rental API is running!'
    })


@ensure_csrf_cookie
def csrf_token(request):

    return JsonResponse({
        'message': 'CSRF cookie set successfully'
    })
