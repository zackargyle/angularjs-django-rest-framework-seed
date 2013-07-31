django-rest-framework-seed
================

Start your Django API in seconds with this Django Rest Framework seed.

REQUIREMENTS: git, python, pip, linux command line

If you are looking to save a little time on starting your app, here is a working start with one example model, fully functioning User model, and token authentication.

Setup:

1. Clone down the repository, and enter directory

2. Run: pip install south django djangorestframework

3. Run: python manage.py syncdb <br>
        - Do not create superuser, wait until rest_framework is migrated,
          otherwise the user will have no associated token

4. Run: python manage.py schemamigration --initial app <br>
        - This creates an initial south migration

5. Run: python manage.py migrate rest_framework.authtoken <br>
        - Token authentication is now active

6. Run: python manage.py createsuperuser <br>
        - Set up username/password

7. Run: python manage.py runserver

8. Visit localhost:8000/admin <br>
        - Provide superuser username/password


There you have it! You have a simple, working API!

Feel free to comment on anything you see.


NOTES: <br>
        
        - You may have to include python version: python2.7 manage.py syncdb
        
        - Check out this tutorial if you have never started a django app before. 
          http://www.jeffknupp.com/blog/2012/10/24/starting-a-django-14-project-the-right-way/
          
        - I highly suggest using a virtualenv as to not mess with in-built dependencies
        
        - It would be a great idea to create a requirements.txt file to document your south,
          django, and djangorestframework versions
