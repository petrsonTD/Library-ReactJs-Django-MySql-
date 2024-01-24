from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from server.models import Book, Member, Borrow
import json

from django.forms.models import model_to_dict

@csrf_exempt
def get_borrows(request):
    borrows = Borrow.objects.all()
    if not borrows:
        return HttpResponse('No borrows found', status=404)

    borrows_list = []
    for borrow in borrows:
        borrow_dict = model_to_dict(borrow)
        borrow_dict['id'] = borrow.pk
        borrow_dict['book'] = model_to_dict(borrow.id_book)
        borrow_dict['member'] = model_to_dict(borrow.id_member)
        borrows_list.append(borrow_dict)

    return JsonResponse(borrows_list, safe=False)

@csrf_exempt
def borrow_book(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id_book = data.get('id_book')
        id_member = data.get('id_member')
        borrow_date = timezone.now()

        book = Book.objects.get(pk=id_book)
        member = Member.objects.get(pk=id_member)

        if not book.available:
            return HttpResponse('Book is already borrowed', status=400)

        book.available = False
        book.save()

        borrow = Borrow.objects.create(id_book=book, id_member=member, borrow_date=borrow_date)
        return JsonResponse(borrow.to_dict(), safe=False)
    else:
        return HttpResponse('Invalid request method', status=405)

@csrf_exempt
def return_book(request):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        id = data.get('id_borrow')
        return_date = timezone.now()

        try:
            borrow = Borrow.objects.get(pk=id)

            if borrow.return_date:
                return HttpResponse('Book was already returned', status=400)

            borrow.return_date = return_date

            book = borrow.id_book
            book.available = True
            book.save()

            borrow.save()

            return JsonResponse(borrow.to_dict(), safe=False)
        except Borrow.DoesNotExist:
            return HttpResponse('Borrow not found', status=404)
    else:
        return HttpResponse('Invalid request method', status=405)