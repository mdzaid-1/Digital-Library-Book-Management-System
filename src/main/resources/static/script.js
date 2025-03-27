const API_URL = "http://localhost:8080/books";

// Fetch & Display Books
function loadBooks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(books => {
            const table = document.getElementById("bookTable");
            table.innerHTML = "";
            books.forEach(book => {
                table.innerHTML += `<tr>
                    <td>${book.id}</td> <td>${book.title}</td> <td>${book.author}</td> 
                    <td>${book.genre}</td> <td>${book.availabilityStatus}</td>
                </tr>`;
            });
        });
}

// Add Book
document.getElementById("addBookForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        availabilityStatus: document.getElementById("availabilityStatus").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    }).then(() => window.location.href = "viewBooks.html");
});


// Update Book
document.getElementById("updateBookForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("updateId").value;
    const updatedBook = {
        title: document.getElementById("updateTitle").value,
        author: document.getElementById("updateAuthor").value,
        genre: document.getElementById("updateGenre").value,
        availabilityStatus: document.getElementById("updateStatus").value
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook)
    }).then(() => alert("Book Updated"));
});

// Delete a Book
function deleteBook() {
    const id = document.getElementById("deleteId").value;
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => alert("Book Deleted"));
}

