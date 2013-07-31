from fabric.api import local, cd, run

local_dir = './'

def launch(version="", port=8001):
	local("python%s manage.py runserver %s" % (version, port))

def install(version=""):
	local("pip install south django djangorestframework django-cors-headers")
	local("python%s manage.py syncdb" % version)
	local("python%s manage.py schemamigration --initial app" % version)
	local("python%s manage.py migrate rest_framework.authtoken " % version)
	local("python%s manage.py createsuperuser" % version)

def clean():
    """Remove all the .pyc files"""
    local("find . -name '*.pyc' -print0|xargs -0 rm", capture=False)