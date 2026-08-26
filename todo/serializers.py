from rest_framework.serializers import ModelSerializer
from todo.models import Todo

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = [
            "id",
            "title",
            "description",
            "completed",
            "is_deleted",
            "created_at",
            "updated_at",
        ]
        
        read_only_fields = [
            "id",
            "is_deleted",
            "created_at",
            "updated_at",
        ]