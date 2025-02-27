import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports: [NgIf, FormsModule]
})
export class BookFormComponent {
  private bookService = inject(BookService);

  @Input() showModal: boolean = false;
  @Input() book: Book = { title: '', publicationDate: '', description: '', pageCount: 0 };
  @Output() closeModal = new EventEmitter<void>();
  @Output() bookSaved = new EventEmitter<Book>();

  saveBook(): void {
    if (!this.book.title || !this.book.publicationDate || !this.book.description || this.book.pageCount <= 0) {
      alert('Всі поля повинні бути заповнені!');
      return;
    }

    if (this.book.id) {
      this.bookService.updateBook(this.book).subscribe(() => this.bookSaved.emit(this.book));
    } else {
      this.bookService.createBook(this.book).subscribe(newBook => this.bookSaved.emit(newBook));
    }

    this.closeModal.emit();
  }
}
