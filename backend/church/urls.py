from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect
from django.views.generic import TemplateView

import django_js_reverse.views


urlpatterns = [    
    path("", TemplateView.as_view(template_name="index.html")),
    path("", include("users.urls", namespace="users")),
    path("checkout/", TemplateView.as_view(template_name="index.html")),
    path("sign-up/", TemplateView.as_view(template_name="index.html")),
    path("sign-in/", TemplateView.as_view(template_name="index.html")),
    path("admin/", admin.site.urls, name="admin"),
    path("api/", include("rest_framework.urls", namespace="rest_framework")),  
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
]
