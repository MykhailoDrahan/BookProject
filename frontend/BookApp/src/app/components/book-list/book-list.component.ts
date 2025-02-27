import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgForOf, FormsModule, DatePipe]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';

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
}
