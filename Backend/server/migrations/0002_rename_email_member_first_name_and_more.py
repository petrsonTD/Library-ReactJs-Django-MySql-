# Generated by Django 4.2.9 on 2024-01-20 19:07

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='email',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='member',
            old_name='name',
            new_name='last_name',
        ),
        migrations.AddField(
            model_name='member',
            name='birth_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='id_book',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='id_borrow',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='member',
            name='id_member',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False),
        ),
    ]
