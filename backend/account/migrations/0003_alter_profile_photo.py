# Generated by Django 5.1.2 on 2024-11-02 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='photo',
            field=models.ImageField(blank=True, default='user_default.png', null=True, upload_to='users/%Y/%m/%d/'),
        ),
    ]