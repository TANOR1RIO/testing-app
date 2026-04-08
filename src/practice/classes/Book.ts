export class Book {
  title: string;
  totalPages: number;
  currentPage: number;

  constructor(title: string, totalPages: number) {
    this.title = title;
    this.totalPages = totalPages;
    this.currentPage = 0;
  }

  read(pages: number): string {
    // Проверка на корректность входных данных
    if (typeof pages !== 'number' || pages <= 0) {
      return 'Некорректное количество страниц';
    }

    // Увеличиваем прогресс
    this.currentPage += pages;

    // Нельзя прочитать больше, чем есть в книге
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    return `Прочитано ${this.currentPage} из ${this.totalPages}`;
  }

  getProgress(): number {
    return Math.floor((this.currentPage / this.totalPages) * 100);
  }

  isFinished(): boolean {
    return this.currentPage === this.totalPages;
  }

  restart(): string {
    this.currentPage = 0;
    return 'Чтение начато заново';
  }

  getInfo(): string {
    return `Название: ${this.title}, страниц: ${this.totalPages}, прочитано: ${this.currentPage}`;
  }
}