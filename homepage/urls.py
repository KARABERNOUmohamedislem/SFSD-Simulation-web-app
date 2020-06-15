from django.urls import path
from .views import HomepageView

app_name = 'homepage'

urlpatterns = [
    path('', HomepageView.as_view(), name='home')
]
