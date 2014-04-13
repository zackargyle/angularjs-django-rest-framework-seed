import os
from fabric.api import (
    local,
    task,
)

local_dir = './'

omit_files = ','.join([
    '**/test*',
    '**/wsgi.py',
    'fabfile.py',
    'manage.py',
])


@task
def create_environment(name='venv'):
        local('virtualenv %s' % name)

@task
def launch(version="", port=8001):
    local("python%s manage.py runserver %s" % (version, port))


@task
def initialize(version=""):
    local("pip install -r requirements.txt")
    local("python%s manage.py syncdb" % version)
    local("python%s manage.py schemamigration --initial app" % version)
    local("python%s manage.py migrate rest_framework.authtoken " % version)
    local("python%s manage.py createsuperuser" % version)


@task
def clean():
    """Remove all the .pyc files"""
    local("find . -name '*.pyc' -print0|xargs -0 rm", capture=False)


@task
def pep8():
    """Executes pep8 report"""
    files = ' '.join([x for x in os.listdir('.')
                      if os.path.isdir(x) or x.endswith('.py')])
    local('pep8 --statistics %s' % files)


@task
def flakes():
    """Searchs static errors in code"""
    local('pyflakes .')

@task
def unit():
    """Execute unit tests"""
    run_unit_tests()
    show_report()


@task
def integration():
    """Execute integration tests"""
    run_unit_tests()
    run_integration_tests()
    show_report()


@task
def acceptance():
    """Execute integration tests"""
    pep8()
    flakes()
    run_unit_tests()
    run_integration_tests()
    run_acceptance_tests(coverage=False)
    show_report()


def run_unit_tests(coverage=True):
    run_tests('testrunners.UnitRunner', coverage)


def run_integration_tests(coverage=True):
    run_tests('testrunners.IntegrationRunner', coverage)


def run_acceptance_tests(coverage=True):
    run_tests('testrunners.AcceptanceRunner', coverage)


def run_tests(runner, coverage=True):
    cmd = (
        'coverage run --source=. --omit="{omit}"'
        if coverage
        else 'python'
    )

    cmd += ' manage.py test --testrunner {runner}'

    local(cmd.format(omit=omit_files, runner=runner))


def show_report():
    local('coverage report')
