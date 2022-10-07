from django.db import models
from django.contrib.auth.models import User

class notifications(models.Model):
    user = models.ForeignKey(        
        User, on_delete = models.CASCADE,related_name = 'notificationRelated',
        related_query_name = 'notificationQuery'
    )
    toUser = models.ManyToManyField(User, related_name = 'notifyUserRelated', related_query_name = 'notifyQuery')
    title = models.CharField(max_length = 225)
    description = models.TextField()
    dated = models.DateField(auto_now_add = True)
    seen = models.BooleanField(default = False)

    def __str__(self) -> str:
        return str(self.title)

    class Meta:
        verbose_name_plural = 'Notifications'
