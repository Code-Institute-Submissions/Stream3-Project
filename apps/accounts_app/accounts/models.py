# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils import timezone

# Create your models here.
class AccountUserManager(UserManager):
    def _create_user(self, username, email, password,
                     is_staff, is_superuser, **extra_fields):
        """
       Creates and saves a User with the given username, email and password.
       """
        now = timezone.now()
        if not email:
            raise ValueError('The given username must be set')
 
        email = self.normalize_email(email)
        user = self.model(username=email, email=email,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
 
        return user
 
class User(AbstractUser):
    # now that we've abstracted this class we can add any
    # number of custom attribute to our user class
 
    stripe_custID = models.CharField(max_length=100, default="None") 
    cart = models.IntegerField(default=0)
    address_line1 = models.CharField(max_length=100, default="None") 
    address_line2 = models.CharField(max_length=100, default="None")
    county = models.CharField(max_length=100, default="None")
    postcode = models.CharField(max_length=8, default="None")

    objects = AccountUserManager()