import { Book } from './Book';

console.log('=== ТЕСТИРОВАНИЕ COUNTER ===');
// ... (код для Counter из шага 2)

console.log('\n=== ТЕСТИРОВАНИЕ BOOK ===');

// Создаём книгу
const book = new Book('Dune', 500);
console.log(book.getInfo()); // Название: Dune, страниц: 500, прочитано: 0

// Читаем 120 страниц
console.log(book.read(120)); // Прочитано 120 из 500
console.log(book.getInfo()); // Название: Dune, страниц: 500, прочитано: 120

// Проверяем прогресс
console.log('Прогресс:', book.getProgress() + '%'); // 24%

// Читаем ещё
console.log(book.read(200)); // Прочитано 320 из 500
console.log('Прогресс:', book.getProgress() + '%'); // 64%

// Пытаемся прочитать больше, чем осталось
console.log(book.read(200)); // Прочитано 500 из 500 (не 520!)
console.log('Прогресс:', book.getProgress() + '%'); // 100%
console.log('Дочитана?', book.isFinished()); // true

// Проверка валидации
console.log(book.read(-10)); // Некорректное количество страниц
console.log(book.read(0)); // Некорректное количество страниц

// Начинаем заново
console.log(book.restart()); // Чтение начато заново
console.log(book.getInfo()); // Название: Dune, страниц: 500, прочитано: 0

// Вторая книга для проверки независимости
const book2 = new Book('1984', 300);
console.log('\nВторая книга:', book2.getInfo());
book2.read(50);
console.log('После чтения 50 стр:', book2.getInfo());
console.log('Первая книга не изменилась:', book.getInfo());