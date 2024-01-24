# Generated by Django 4.2.9 on 2024-01-19 11:57

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id_book', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('author', models.CharField(max_length=255)),
                ('available', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id_member', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Borrow',
            fields=[
                ('id_borrow', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('borrow_date', models.DateTimeField()),
                ('return_date', models.DateTimeField(null=True)),
                ('id_book', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='server.book')),
                ('id_member', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='server.member')),
            ],
        ),
    ]
