from .base import *
import dj_database_url

from django.conf import settings
import stripe

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Database
# Load the ClearDB connection details from the environment variable
DATABASES = {
    'default': dj_database_url.config('CLEARDB_DATABASE_URL')
}


SECRET_KEY = os.getenv('SECRET_KEY')
STRIPE_SECRET = os.getenv('STRIPE_SECRET')
PAYPAL_RECEIVER_EMAIL = os.getenv('STRIPE_SECRET')


#Stripe Environment Variables:
STRIPE_PUBLISHABLE = os.getenv('STRIPE_PUBLISHABLE', 'pk_test_zkkJLlqQ1Tc9XhPXQhJi7QZC')
#STRIPE_SECRET is in private.py, which is ignroed by GIT, to prevent it being uploaded to GitHub
stripe.api_key = settings.STRIPE_SECRET

SITE_URL = 'https://stream-3-project.herokuapp.com'
ALLOWED_HOSTS.append('stream-3-project.herokuapp.com')
 
# Log DEBUG information to the console
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
    },
}

#Compressing static files, comemnted out as this causes the site to fail
#https://stackoverflow.com/questions/26829435/collectstatic-command-fails-when-whitenoise-is-enabled/32347324#32347324
#STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

AWS_STORAGE_BUCKET_NAME = 'stream3img'
AWS_S3_REGION_NAME = 'eu-west-2'  # e.g. us-east-2

# These are set on heroku as config variables to avoid prying eyes!
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID') 
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

# Tell django-storages the domain to use to refer to static files.
AWS_S3_CUSTOM_DOMAIN = 's3.%s.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

MEDIA_URL = 'https://s3.eu-west-2.amazonaws.com/stream3img/'

#Point media files to Amazon storage files
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'





