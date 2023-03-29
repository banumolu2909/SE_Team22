from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

# Create your models here.

# class student(models.Model):
#   firstname = models.CharField(max_length=255)
#   lastname = models.CharField(max_length=255)
# #   user_id = models.CharField(max_length=255)

class Roles(models.Model):
  role = models.CharField(max_length=255, default='Student')

class userData(models.Model):
  role_type_choice = (
        ('S','Student'),
        ('I','Instructor'),
        ('A','Admin')
    )

  id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
  first_name = models.CharField(max_length=30)
  last_name = models.CharField(max_length=30)
  email = models.EmailField(max_length=254)
  role = models.CharField(default='S',
                          choices=role_type_choice,
                          max_length=1)
  login_time = models.DateTimeField(auto_now_add=True)
  logout_time = models.DateTimeField(auto_now_add=True)
  
class Courses(models.Model):
  course_id = models.IntegerField(primary_key=True)
  course_number = models.IntegerField()
  course_name = models.CharField(max_length=255)
  term = models.CharField(max_length=50)
  
class Enrollments(models.Model):
  user = models.IntegerField()
  course_id = models.IntegerField()
  
  class Meta:
            unique_together = (('user','course_id'))  