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
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  private bookService = inject(BookService);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.filteredBooks = [...this.books];
    });
  }

  onSearchChange(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortBooks();
  }

  sortBooks(): void {
    this.filteredBooks.sort((a, b) => {
      let valueA = (a as any)[this.sortField];
      let valueB = (b as any)[this.sortField];

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  openModal(book?: Book): void {
    this.selectedBook = book ? { ...book } : { title: '', publicationDate: '', description: '', pageCount: 0 };
    this.showModal = true;
  }

  onBookSaved(): void {
    this.showModal = false;
    this.loadBooks();
  }
}
