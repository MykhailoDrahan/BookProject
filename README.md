### Technologies:
- **Backend:** ASP.NET Core 8, Entity Framework Core, MSSQL
- **Frontend:** Angular, TypeScript, Chart.js
- **API Documentation:** Swagger
- **Data Export:** CSV, PDF (via browser print)

### Backend (C# ASP.NET Core)
- Implemented `BooksController.cs` with full CRUD operations (Create, Read, Update, Delete).
- Configured **Entity Framework Core** (Code-First, MSSQL).
- Integrated **Swagger** for automatic API documentation.
- Configured **database connection** in `Program.cs`.
- Created **database migrations** (`dotnet ef database update`).

### Frontend (Angular)
- **Implemented UI** for managing books.
- **Search, sorting, filtering** (date range, "This month", "This year").
- **Chart (Chart.js):** number of books by publication year.
- **Export table** to CSV and PDF (via print).
- **Responsive UI** for better usability.

## Set up
### Backend
Navigate to `backend/BookApi` and rum terminal:
```
dotnet restore
dotnet ef database update
```
### Frontend
Navigate to `frontend/BookApp/` and rum terminal:


## Running the Application
### Start Backend
Run the following command in `Backend/BookApi`: 
```
dotnet run
```
Swagger is available at: `http://localhost:5224/swagger`
```
npm install
```

### Start Frontend
Run the following command in `Frontend/BookApp/`:
```
ng serve
```
UI is available at: `http://localhost:4200`

## MSSQL Configuration
Configured MSSQL connection to use Windows Authentication (Integrated Security) for local development.
Alternatively, update `backend/BookApi/appsettings.json` to match your server settings.

## Adding Sample Books
You can add new books using the Swagger API or directly insert them into the database.

### Option 1: Add Books via Swagger
1. Open `http://localhost:5224/swagger`
2. Navigate to the **POST** request: `/api/books`
3. Click Try it out and enter a new book in JSON format:

### Option 2: Insert Books Directly into MSSQL
```
USE BookDB;

INSERT INTO Books (Title, PublicationDate, Description, PageCount) VALUES
('The Great Adventure', '2023-05-12', 'An exciting story about adventure and discovery.', 320),
('Mystery of the Lost Island', '2022-09-08', 'A thrilling mystery novel set on a remote island.', 280),
('Journey to the Stars', '2021-06-21', 'A sci-fi epic about space exploration.', 410),
('The Secret of the Ancient Ruins', '2020-12-15', 'An archaeologist’s quest to uncover hidden secrets.', 350),
('Legends of the Forgotten Kingdom', '2019-07-30', 'A fantasy tale about a lost kingdom.', 500);
```
