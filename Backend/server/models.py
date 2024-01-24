from django.db import models
import uuid

class Book(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, max_length=36, editable=False)
    book_id = models.CharField(default=uuid.uuid4, max_length=255)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    available = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'book_id': self.book_id,
            'title': self.title,
            'author': self.author,
            'available': self.available
        }

    def __str__(self):
        return self.title
    
class Member(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, max_length=36, editable=False)
    id_card = models.CharField(default=uuid.uuid4, max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    deleted = models.BooleanField(default=False)

    def to_dict(self):
        return {
            'id': str(self.id),
            'id_card': self.id_card,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birth_date': self.birth_date
        }

    def __str__(self):
        return self.name
    
class Borrow(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, max_length=36, editable=False)
    id_book = models.ForeignKey(Book, on_delete=models.PROTECT)
    id_member = models.ForeignKey(Member, on_delete=models.PROTECT)
    borrow_date = models.DateTimeField()
    return_date = models.DateTimeField(null=True)

    def to_dict(self):
        return {
            'i': str(self.id),
            'id_book': str(self.id_book.id),
            'id_member': str(self.id_member.id),
            'borrow_date': self.borrow_date,
            'return_date': self.return_date
        }

    def __str__(self):
        return self.id