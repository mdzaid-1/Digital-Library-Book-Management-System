document.addEventListener("DOMContentLoaded", function () {
    fetchBooks();
});

function fetchBooks() {
    fetch("http://localhost:8080/books")
        .then(response => response.json())
        .then(books => {
            console.log("Books fetched from API:", books); 

            const bookTable = document.getElementById("bookTable");
            bookTable.innerHTML = ""; 

            if (books.length === 0) {
                bookTable.innerHTML = "<tr><td colspan='5'>No books found in the library.</td></tr>";
                return;
            }

            books.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.availabilityStatus}</td>
                `;
                bookTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching books:", error);
            document.getElementById("bookTable").innerHTML = "<tr><td colspan='5'>Failed to load books.</td></tr>";
        });
}
