import pytz
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator

DESIGNATION_CHOICES = [
    ('Manager', 'Manager'),
    ('Supervisor', 'Supervisor'),
    ('Lead', 'Lead'),
    ('Specialist', 'Specialist'),
    ('Associate', 'Associate'),
    ('Junior', 'Junior')
]


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=100)
    designation = models.CharField(max_length=30, choices=DESIGNATION_CHOICES)
    joining_date = models.DateField()
    timezone = models.CharField(
        max_length=50,
        choices=[(tz, tz) for tz in pytz.all_timezones],
        default='UTC'
    )
    photo = models.ImageField(
        upload_to='users/%Y/%m/%d/',
        blank=True,
        null=True,
        default=f'user_default.png'
    )
    contact_no = models.CharField(max_length=15)

    def __str__(self):
        return f'Profile of {self.user.username}'
