# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-07 09:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_product_photo_alt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='photo_alt',
            field=models.CharField(default='img alt', max_length=254),
        ),
    ]