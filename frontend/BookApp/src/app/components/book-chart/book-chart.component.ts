import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { Book, BookService } from '../../services/book.service';

Chart.register(...registerables);

@Component({
  selector: 'app-book-chart',
  standalone: true,
  templateUrl: './book-chart.component.html',
  styleUrls: ['./book-chart.component.css']
})
export class BookChartComponent implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];
  chart!: Chart;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.createChart();
    });
  }

  createChart(): void {
    const yearCounts: { [key: string]: number } = {};
    
    this.books.forEach(book => {
      const year = new Date(book.publicationDate).getFullYear().toString();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(yearCounts).sort(),
        datasets: [
          {
            label: 'Кількість книг',
            data: Object.values(yearCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Кількість книг за роками' }
        }
      }
    });
  }
}
