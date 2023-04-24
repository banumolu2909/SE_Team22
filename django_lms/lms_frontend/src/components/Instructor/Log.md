apr-20: InstructorChangePassword.js  - To change the password of an instructor
- urls.py
- views.py
- InstructorLeftSideBar.js
- Main.js


apr-20: Instructor dashboad
- in models.py - created three methods 
- in serializers.py - created an instructordashboard serializer with above methods as fields
- in views.py - created a view called InstructorDashboard
- created instructordashboard.js file
- added and modified the links in instructorleftsidebar for my-courses and dashboard

apr-20: Instructor account.js - modifying for OTP enable/disable option
- added login_via_otp field in instuctoraccount.js 
- Created a new column - login_via_otp in instructors table from models.py
- added the field in serializers.py in instructor and student serializers
- In views.py, added verify_instructor_via_otp and verify_student_via_otp views as functions
- In login page, navigate to otp page after successful entry of login details. This is in submitForm function.

Issues:
With the same email, being able to register multiple times.

apr-20: ForgotPassword - Instructor
- created InstructorForgotPassword.js
- added route in main.js
- added a new view called instructor-forgot-password in views.py and updated urls.py
- Created InstructorResetPassword.js to reset the password
- added route in main.js
- added a new view called instructor-reset-password in views.py and updated urls.py
- Update the InstructorLogin.js for links to these pages

apr-20: ForgotPassword - Student
Same as above.

Issues: 
- Unable to logout from different pages
- If logged in, the dropdown shows login and register until refreshed. 
- Unable to upload pictures from frontend.


Apr-21: Chat Feature:
- Updated MyStudents.js file by creating a view for chat
- created a new model InstructorStudentChat 
- added corresponding url in urls.py
- created a new view save_instructor_student_msg

---Messages being sent into the db---
To fetch the messages
- Created InstructorMessageList.js
- imported it into Mystudents.js
- created a new class based view and a serializer
- updated the corresponding url in urls.py

Apr21: Send group messages:
- updated mystudents.js file with send group assignment view and related handleSubmit and formsubmit functions
- updated urls.py 
- created a new view in views.py - save_instructor_group_chat

Apr21: Chat feature in Student dashboard:
- created a new view to fetch all instructors whose course a student is enrolled in. MyInstructors.js
- updated the urls.py 
<!-- Error during sql raw in views.py: 
sudo mysql -u root -p
mysql > SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); -->
- updated CourseSerializer by removing depth = 1 to show the instructors list in MyInstructors.js


Apr 22
Added two new models related to assignment in models.py
- Added four assignment related views in views.py and a function that gets course assignment



Pagination: 
- Modified AllCourses.py
- Added a view in views.py