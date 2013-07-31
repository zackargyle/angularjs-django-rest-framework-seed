from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('backend.views',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^', include('app.urls')))
