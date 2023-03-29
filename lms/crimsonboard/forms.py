from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

role_type_choice = (
        ('S','Student'),
        ('I','Instructor'),
        ('A','Admin')
    )

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')
    role = forms.ChoiceField(choices=role_type_choice)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', 'role')