from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from app import views

urlpatterns = patterns('app.views', url(r'^addresses$', views.AddressList.as_view(), name='address-list'),
                       url(r'^addresses/(?P<pk>[0-9]+)$', views.AddressDetail.as_view(), name='address-detail'),
                       url(r'^users$', views.UserList.as_view(), name='user-list'),
                       url(r'^users/(?P<pk>[0-9]+)$', views.UserDetail.as_view(), name='user-detail'),)

urlpatterns += patterns('',
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token')
)

urlpatterns = format_suffix_patterns(urlpatterns)
