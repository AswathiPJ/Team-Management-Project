import zoneinfo
from django.utils import timezone

class TimezoneMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        tz = request.COOKIES.get("timezone")
        if tz:
            print("timezone fetched through middleware", tz)
            timezone.activate(zoneinfo.ZoneInfo(tz))
        else:
            print("couldn't fetch timezone")
            timezone.activate(zoneinfo.ZoneInfo("Asia/Kolkata"))
        return self.get_response(request)