import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgForOf, FormsModule, DatePipe, BookFormComponent]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  selectedBook: Book = { title: '', publicationDate: '', description: '', pageCount: 0 };

  private bookService = inject(BookService);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.filteredBooks = data;
    });
  }

  onSearchChange(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(book?: Book): void {
    this.selectedBook = book ? { ...book } : { title: '', publicationDate: '', description: '', pageCount: 0 };
    this.showModal = true;
  }

  onBookSaved(): void {
    this.showModal = false;
    this.loadBooks(); // 🔹 Оновлюємо список після збереження книги
  }
}
