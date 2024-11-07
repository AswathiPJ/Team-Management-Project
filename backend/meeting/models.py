from django.db import models
from django.contrib.auth.models import User
from account.models import Profile
from django.utils import timezone
import pytz

class Meeting(models.Model):
    meeting_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    duration = models.PositiveIntegerField()
    participants = models.ManyToManyField(Profile, related_name='meetings')
    organizer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='organized_meetings')
    meeting_link = models.CharField(max_length=255)
    timezone = models.CharField(
        max_length=50,
        choices=[(tz, tz) for tz in pytz.all_timezones],
        default='UTC'
    )
    status = models.CharField(max_length=20, choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Canceled', 'Canceled')], default='Scheduled')


    def end_time(self):
        """Calculate the end time of the meeting."""
        start_datetime = timezone.make_aware(
            timezone.datetime.combine(self.date, self.start_time),
            timezone.get_current_timezone()
        )
        end_datetime = start_datetime + timezone.timedelta(minutes=self.duration)
        return end_datetime.time()

    def __str__(self):
        return f"{self.title} on {self.date} at {self.start_time}"

    class Meta:
        ordering = ['date', 'start_time']

