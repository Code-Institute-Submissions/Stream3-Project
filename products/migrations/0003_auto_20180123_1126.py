# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-23 11:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20180120_2245'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['name']},
        ),
    ]
