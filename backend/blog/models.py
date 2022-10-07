from django.db import models
from django.core.validators import RegexValidator, FileExtensionValidator
from django.contrib.auth.models import User


def bannerUploadPath(instance, filename) -> str:
    return f'banner/{instance}-{filename}'

class blogPost(models.Model):
    title = models.CharField(max_length = 200, unique = True, validators = [
        RegexValidator(
            regex = "[a-zA-Z0-9\[\-\]\s]+",
            message = 'only charcter, number, space and [ ]'
        )
    ])
    description = models.TextField(null=True)
    slug = models.SlugField(max_length = 200, unique = True)
    author = models.ForeignKey(
        User, on_delete = models.CASCADE,related_name = 'blogRelated',
        related_query_name = 'blogQuery'
    )
    updated_on = models.DateTimeField(auto_now = True)
    html = models.TextField()
    banner = models.ImageField(upload_to = bannerUploadPath, 
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png'],
                message =  'Only jpg, jpeg, png are allowed'
            )
        ],
        null = True, blank = True
    )
    created_on = models.DateTimeField(auto_now_add=True)

    STATUS = [
      ('D', 'Draft'),
      ('P', 'Publish'),
      ('H', 'Hidden'),
      ( 'AD', 'Admin Deleted')
    ]
    status = models.CharField(choices=STATUS, default='D', max_length=30)

    class Meta:
        ordering = ['-created_on']
        verbose_name_plural = 'Blogs'

    def getDispalyName(self):
        name = self.get_status_display()
        return name

    def getAuthorName(self):
        author = f'{self.author.first_name} {self.author.last_name}'
        return str(author)

    def __str__(self):
        return str(self.title)
