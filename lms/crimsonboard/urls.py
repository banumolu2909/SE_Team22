from django.urls import path
from . import views
from django.contrib import admin
# from django.contrib.auth import views as auth_views
from crimsonboard.views import *

# Route is the App name, eg: crimsonboard web app
# view is the view name, eg: crimsonboard app's view?
# name is the name of the function in the views.py
# urlpatterns = [
#     path(route='api/login', view=views.login, name='crimsonboard_login'),
#     path(route='api/sign_up', view=views.sign_up, name='crimsonboard_signup'), 
# ]

app_name = 'crimsonboard'

urlpatterns = [
path('login/', views.login_render, name='login'),
path('api/login/', views.user_login, name='api-login'),
# path('logout/', views.Logout, name='logout'),
path('logout/', views.user_logout, name='logout'),
path('', views.home,name="home"),
path('api/home/', views.home, name="home"),
path('register/', views.register1, name='register'),
path('api/register/', views.register2, name='api-register'),

path('api/u/', views.UserList.as_view()),
path('api/c/', views.CourseList.as_view()),
path('api/u/<int:pk>', views.UserDetail.as_view()),
path('api/c/<int:pk>', views.CourseDetail.as_view()),
path('api/browseCourses/', views.getCourses, name='browseCourses'),
path('api/viewEnrollments/', views.viewEnrollments, name='viewEnrollments'),

path('api/profile/', views.profile, name='profile'),
path('admin/', admin.site.urls),
path('instructorHome/', views.profView, name="instructorHome"),
# path('profile/', views.stuView, name="profile"),
path('test/', test), 
path('testjson/', testjson),
# path('login/',views.login, name='login'),
]