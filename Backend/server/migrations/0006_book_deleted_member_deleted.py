# Generated by Django 4.2.9 on 2024-01-24 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_rename_bookid_book_book_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='member',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]