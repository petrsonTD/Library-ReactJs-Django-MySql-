# Generated by Django 4.2.9 on 2024-01-22 09:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_rename_id_book_book_id_rename_id_borrow_borrow_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='bookId',
            field=models.CharField(default=uuid.uuid4, max_length=255),
        ),
        migrations.AddField(
            model_name='member',
            name='idCard',
            field=models.CharField(default=uuid.uuid4, max_length=255),
        ),
    ]
