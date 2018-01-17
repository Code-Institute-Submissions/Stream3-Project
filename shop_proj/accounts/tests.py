# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.core.urlresolvers import resolve
from django.shortcuts import render_to_response
from django.utils import timezone
from django.test.client import RequestFactory

from accounts.models import User
from accounts.views import login



# Create your tests here.

class AccountsTest(TestCase):
 
	def setUp(self):
		super(AccountsTest, self).setUp()
		self.user = User.objects.create(username='testing@account.com')
		self.user.set_password('testing')
		self.user.last_login = timezone.now()
		self.user.save()

	#Testing URL resolution
	def test_login_page_view(self):
		login_page = resolve('/accounts/login/')
		self.assertEqual(login_page.func, login)






