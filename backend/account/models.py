import zoneinfo
from django.db import models
from django.conf import settings

DESIGNATION_CHOICES = [
    ('ProjectManager', 'Project Manager'),
    ('TeamLead', 'Team Lead'),
    ('SoftwareDeveloper', 'Software Developer'),
    ('QAEngineer', 'QA Engineer'),
    ('UI/UXDesigner', 'UI/UX Designer'),
    ('BusinessAnalyst', 'Business Analyst')
]

TIMEZONES_CHOICES = [(tz, tz) for tz in zoneinfo.available_timezones()]

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
        default="UTC",
        choices=TIMEZONES_CHOICES,
    )
    contact_no = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username
