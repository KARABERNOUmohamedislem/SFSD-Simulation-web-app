from django.shortcuts import render
from django.views.generic import ListView
from .models import Member
# Create your views here.

class HomepageView(ListView):
    template_name = 'homepage/homepage.html'
    queryset = Member.objects.all()
