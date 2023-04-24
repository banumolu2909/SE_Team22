# Generated by Django 4.1.7 on 2023-04-17 19:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_instructor_login_via_otp_student_login_via_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentcourseenrollment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled_student', to='main.student'),
        ),
    ]