from django.urls import path
from .viewsHelper import book_views, member_views, borrow_views

urlpatterns = [
    # Book CRUD
    path('books/', book_views.get_books),
    path('availableBooks/', book_views.get_available_books),
    path('book/<str:id>/', book_views.get_book),
    path('createBook/', book_views.create_book),
    path('updateBook/', book_views.update_book),
    path('deleteBook/<str:id>/', book_views.delete_book),
    # Member CRUD
    path('members/', member_views.get_members),
    path('member/<str:id>/', member_views.get_member),
    path('createMember/', member_views.create_member),
    path('updateMember/', member_views.update_member),
    path('deleteMember/<str:id>/', member_views.delete_member),
    # Borrow
    path('borrows/', borrow_views.get_borrows),
    path('borrowBook/', borrow_views.borrow_book),
    path('returnBook/', borrow_views.return_book),
]
