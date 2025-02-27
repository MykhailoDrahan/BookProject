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
