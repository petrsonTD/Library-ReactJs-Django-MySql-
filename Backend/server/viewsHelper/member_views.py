from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from server.models import Member, Borrow
import json

@csrf_exempt
def get_members(request):
    members = Member.objects.filter(deleted=False)
    if not members:
        return HttpResponse('No members found', status=404)

    members_list = list(members.values())
    return JsonResponse(members_list, safe=False)

@csrf_exempt
def get_member(request, id):
    try:
        member = Member.objects.get(pk=id)
        member_dict = member.to_dict()

        borrowed_books = Borrow.objects.filter(id_member=member, return_date__isnull=True)
        member_dict['borrowed_books'] = [{'book': borrow.id_book.to_dict(), 'borrow_id': str(borrow.id)} for borrow in borrowed_books]

        return JsonResponse(member_dict, safe=False)
    except Member.DoesNotExist:
        return HttpResponse('Member not found', status=404)

@csrf_exempt
def create_member(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        birth_date = data.get('birth_date')
        id_card = data.get('id_card')

        member = Member.objects.create(id=id, first_name=first_name, last_name=last_name, birth_date=birth_date, id_card=id_card)
        return JsonResponse(member.to_dict(), safe=False)
    else:
        return HttpResponse('Invalid request method', status=405)

@csrf_exempt
def update_member(request):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        id = data.get('id')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        birth_date = data.get('birth_date')
        id_card = data.get('id_card')

        try:
            member = Member.objects.get(pk=id)
            member.first_name = first_name if first_name is not None else member.first_name
            member.last_name = last_name if last_name is not None else member.last_name
            member.birth_date = birth_date if birth_date is not None else member.birth_date
            member.id_card = id_card if id_card is not None else member.id_card
            member.save()

            return JsonResponse(member.to_dict(), safe=False)
        except Member.DoesNotExist:
            return HttpResponse('Member not found', status=404)
    else:
        return HttpResponse('Invalid request method', status=405)

@csrf_exempt
def delete_member(request, id):
    try:
        member = Member.objects.get(pk=id)
        member.deleted = True
        member.save()
        return HttpResponse('Deleted')
    except Member.DoesNotExist:
        return HttpResponse('Member not found', status=404)