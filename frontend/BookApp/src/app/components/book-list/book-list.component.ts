import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookChartComponent } from '../book-chart/book-chart.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgForOf, FormsModule, DatePipe, BookFormComponent, MatDatepickerModule, MatNativeDateModule, BookChartComponent ]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  selectedBook: Book = { title: '', publicationDate: '', description: '', pageCount: 0 };
  selectedBookId: number | null = null;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  startDate: string | null = null;
  endDate: string | null = null;

  private bookService = inject(BookService);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredBooks = this.books.filter(book => {
      const publicationDate = new Date(book.publicationDate).toISOString().split('T')[0];

      if (this.searchTerm && !book.title.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }

      if (this.startDate && publicationDate < this.startDate) {
        return false;
      }

      if (this.endDate && publicationDate > this.endDate) {
        return false;
      }

      return true;
    });

    this.sortBooks();
  }

  onSearchChange(): void {
    this.applyFilters();
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

  filterThisMonth(): void {
    const now = new Date();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    this.applyFilters();
  }

  filterThisYear(): void {
    const now = new Date();
    this.startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
    this.endDate = new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0];
    this.applyFilters();
  }

  clearFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.applyFilters();
  }

  setActiveBook(bookId: number | undefined): void {
    if (bookId !== undefined) {
      this.selectedBookId = this.selectedBookId === bookId ? null : bookId;
    }
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
