from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.template import loader
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from crimsonboard.forms import SignUpForm
from crimsonboard.models import Roles, userData, Courses, Enrollments
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core import serializers
from crimsonboard.serializers import UserSerializer, CourseSerializer, EnrollmentsSerializer

# Create your views here.

@csrf_exempt
def Login(request):
    print("IN Login API")
    if request.user.is_authenticated:
        return render(request, 'home.html')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/profile') # user profile
        else:
            msg = 'Error Login'
            form = AuthenticationForm(request.POST)
            return render(request, 'login.html', {'form': form, 'msg': msg})
    else:
        form = AuthenticationForm()
        return render(request, 'login.html', {'form': form})

@csrf_exempt
def register1(request):
    form = SignUpForm()
    return render(request, 'register.html', {'form': form})

@csrf_exempt
def register2(request):
    print('In API Part of register')
    if request.method=='POST':
        form = SignUpForm(request.POST)
        print(form)
        if form.is_valid():
            user = form.save()
            role = form.cleaned_data.get('role')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            email = form.cleaned_data.get('email')
            print("\n")
            print("\n These are the credentials:", user, username, password, first_name, last_name, email, role)
            print("\n")
            if role=='instructor' or role=='Instructor' or role=='I':
                userData.objects.create(id=user, 
                                        first_name=first_name,
                                        last_name=last_name,
                                        email=email,
                                        role='I')
            elif role=='admin' or role=='Admin' or role=='A':
                userData.objects.create(id=user, 
                                        first_name=first_name,
                                        last_name=last_name,
                                        email=email,
                                        role='A')
            else:
                userData.objects.create(id=user,
                                        first_name=first_name,
                                        last_name=last_name,
                                        email=email,)
            user = authenticate(username=username, password=password)
            login(request, user)
            return render(request, 'home.html')
        else:
            return JsonResponse({"Error":"Error during Registration"})
    else:
        # form = UserCreationForm()
        return JsonResponse({"Error":"Method not allowed"})
     
def login_render(request):
    return render(request, 'login.html')

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            user_data = userData(id=user)
            user_data.login_time = timezone.now()
            user_data.save(update_fields=['login_time'])
            print("Login success")
            return render(request, 'home.html')
        else:
            return render(request, 'login.html', {'error_message': 'Invalid login credentials'})
    else:
        return JsonResponse({"Error":"Method not allowed"})
    
def profile(request): 
    # return render(request, 'profile.html')
    if request.user.is_authenticated:
        if request.method=='GET':
            return render(request, 'profile.html')

@csrf_exempt
def browseCourses(request): 
    if request.method=="GET":
        if request.user.is_authenticated:
            # user_data = userData.objects.get(request.user.id)
            # print(user_data)
            # if user_data.role=='S':
            course_content = Courses.objects.all()
            # cc_json = serializers.serialize('json', course_content)
            context = {'courses': course_content}
            return render(request, 'browseCourses.html', context)
            # user_data_serialized = serializers.serialize('json', user_data)
            # return JsonResponse(cc_json.fields)
            # return JsonResponse({"data": user_data})
        else:
            return render(request, 'login.html')
    else:
        return JsonResponse({"Error":"Method not allowed"})
        
@api_view(['GET'])
def getCourses(request):
    course_content = Courses.objects.all()
    serializer = CourseSerializer(course_content, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def viewEnrollments(request):
    if request.user.is_authenticated:
            user_data = userData.objects.get(id=request.user)
            print(user_data)
            if user_data.role=='S':
                enrolled = Enrollments.objects.filter(user=request.user.id)
                print(len(enrolled))
                serializer = EnrollmentsSerializer(enrolled, many=True)
                return Response(serializer.data)
            else:
                return JsonResponse({"Error":"Not A Student"})
    else:
        return render(request, 'login.html')
        
                
                
    
def home(request):
    print('Hello\n')
    if request.user.is_authenticated:
        if request.method=="GET":
            return render(request, 'home.html')
        else:
            return JsonResponse({"Error":"Method not allowed"})
    else:
        return render(request, 'login.html')

def user_logout(request):
    if request.user.is_authenticated:
        user_data = userData.objects.get(id=request.user)
        user_data.logout_time = timezone.now()
        user_data.save(update_fields=['logout_time'])
        logout(request)
    return render(request, 'login.html')

def test(self):
    print("In here")

    msg = "Hi Hello Team, welcome to the API"
    return HttpResponse(msg, content_type='text/plain')

def testjson(self):
    print("In here")
    msg = "Hi Hello Team, welcome to the JsonAPI"
    return JsonResponse({'Status':'Registration Successful, Please login','msg':msg})

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = userData.objects.all()
        role = self.request.query_params.get('role')
        if role is not None and role=='S':
            queryset = queryset.filter(role=role)
        return queryset

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = userData.objects.all()
    serializer_class = UserSerializer

class CourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Courses.objects.all()
        term = self.request.query_params.get('term')
        if term is not None:
            queryset = queryset.filter(term=term)
        return queryset

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Courses.objects.all()
    serializer_class = CourseSerializer
    
    
'''
def stuView(request):
    if request.user.is_authenticated: # and request.user.role == 'Student':
        user_data = userData.objects.get(id=request.user)
        if user_data.role=='S':
            print('In student view')
            # ser = UserSerializer(user_data)
            # json_render = JSONRenderer().render(ser.data)
            # json_render
            # return render(request, "profile.html")
            # return JsonResponse(json_render)
        
        elif user_data.role=='I':
            print('In Instructor view')
            return render(request, "base.html")
        else:
            print('In Admin view')
            return render(request, "base.html")
        # Perform query to fetch details from database
        # return render(request, "studentHome.html")
'''

    
def profView(request):
    if request.user.is_authenticated: # and request.user.role == 'Instructor':
        # Perform query to fetch details from database
        return render(request, "instructorHome.html")
    
