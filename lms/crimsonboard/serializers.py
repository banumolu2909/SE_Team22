from rest_framework import serializers
from .models import userData, User, Courses, Enrollments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userData
        fields = ('__all__')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('__all__')
        
class EnrollmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollments
        fields = ('__all__')        