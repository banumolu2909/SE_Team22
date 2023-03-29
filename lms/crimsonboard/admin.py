from django.contrib import admin
from .models import userData, Courses, Enrollments

# Register your models here.

admin.site.register(userData)
admin.site.register(Courses)
admin.site.register(Enrollments)

