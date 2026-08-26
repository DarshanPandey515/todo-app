from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import HttpResponse
from todo.models import Todo
from todo.serializers import TodoSerializer

# def health(request):
#     return HttpResponse(
#         "working!",
#         content_type="text/plain"
#     )
    
    
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        return Todo.objects.filter(is_deleted=False)
    
    
    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save(update_fields=["is_deleted", "updated_at"])
        
        