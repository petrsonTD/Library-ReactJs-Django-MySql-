from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from server.models import Book, Borrow
import json

@csrf_exempt
def get_books(request):
    books = Book.objects.filter(deleted=False)
    if not books:
        return HttpResponse('No books found', status=404)

    books_list = []
    for book in books:
        book_dict = model_to_dict(book)
        book_dict['id'] = book.pk
        if not book.available:
            borrow = Borrow.objects.filter(id_book=book, return_date__isnull=True).first()
            if borrow:
                member_dict = model_to_dict(borrow.id_member)
                member_dict['id'] = borrow.id_member.pk
                book_dict['borrowed_by'] = member_dict
        books_list.append(book_dict)

    return JsonResponse(books_list, safe=False)

@csrf_exempt
def get_available_books(request):
    available_books = Book.objects.filter(available=True)
    return JsonResponse([book.to_dict() for book in available_books], safe=False)

@csrf_exempt
def get_book(request, id):
    try:
        book = Book.objects.get(pk=id)
        book_dict = model_to_dict(book)
        book_dict['id'] = book.pk
        if not book.available:
            borrow = Borrow.objects.filter(id_book=book, return_date__isnull=True).first()
            if borrow:
                member_dict = model_to_dict(borrow.id_member)
                member_dict['id'] = borrow.id_member.pk
                book_dict['borrowed_by'] = member_dict
        return JsonResponse(book_dict, safe=False)
    except Book.DoesNotExist:
        return HttpResponse('Book not found', status=404)

@csrf_exempt
def create_book(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        title = data.get('title')
        author = data.get('author')
        book_id = data.get('book_id')

        book = Book.objects.create(id=id, title=title, author=author, book_id=book_id)
        return JsonResponse(book.to_dict(), safe=False)

    else:
        return HttpResponse('Invalid request method', status=405)

@csrf_exempt
def update_book(request):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        id = data.get('id')
        title = data.get('title')
        author = data.get('author')
        book_id = data.get('book_id')
        available = data.get('available')

        try:
            book = Book.objects.get(pk=id)
            book.title = title if title is not None else book.title
            book.author = author if author is not None else book.author
            book.book_id = book_id if book_id is not None else book.id
            book.available = available if available is not None else book.available
            book.save()

            return JsonResponse(book.to_dict(), safe=False)
        except Book.DoesNotExist:
            return HttpResponse('Book not found', status=404)
    else:
        return HttpResponse('Invalid request method', status=405)

@csrf_exempt
def delete_book(request, id):
    try:
        book = Book.objects.get(pk=id)
        book.deleted = True
        book.save()
        return HttpResponse('Deleted')
    except Book.DoesNotExist:
        return HttpResponse('Book not found', status=404)