from django.db import models

import os

BASE_DIR_ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def teampath():
    return os.path.join(BASE_DIR_, 'homepage/static/assets/team/')


# Create your models here.
class Member(models.Model):
    picture = models.ImageField(upload_to=teampath(), max_length=500)
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    university = models.CharField(max_length=320)
    mail = models.EmailField()
    linkedin = models.TextField(max_length=333)
    github = models.TextField(max_length=333)

    def get_img_path(self):
        path = self.picture.name.split('/')
        new_path = [path[-3], path[-2], path[-1]]
        path = '/'.join(new_path)
        print(path)
        return path
