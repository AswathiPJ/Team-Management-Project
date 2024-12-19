# Generated by Django 5.1.3 on 2024-12-16 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_alter_profile_designation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='designation',
            field=models.CharField(choices=[('ProjectManager', 'Project Manager'), ('TeamLead', 'Team Lead'), ('SoftwareDeveloper', 'Software Developer'), ('QAEngineer', 'QA Engineer'), ('UI/UXDesigner', 'UI/UX Designer'), ('BusinessAnalyst', 'Business Analyst')], max_length=30),
        ),
    ]
