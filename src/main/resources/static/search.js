document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, script running!");

    // Attach event listener to search button
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        console.log("Search button found! Adding event listener.");
        searchButton.addEventListener("click", searchBook);
    } else {
        console.error("Search button NOT found! Check the ID in HTML.");
    }

    // If on searchResult.html, execute fetchSearchResults
    if (window.location.pathname.includes("searchResult.html")) {
        console.log("Detected searchResult.html, fetching search results...");
        fetchSearchResults();
    }
});

// Function to handle search and redirection
function searchBook() {
    console.log("Search button clicked!");

    // Correctly fetch input values
    const bookId = document.getElementById("searchId").value;
    const bookTitle = document.getElementById("searchTitle").value;

    console.log("Book ID:", bookId, "Book Title:", bookTitle);

    if (!bookId && !bookTitle) {
        alert("Please enter a Book ID or Title to search.");
        return;
    }

    let searchUrl = "searchResult.html?";
    if (bookId) {
        searchUrl += `id=${encodeURIComponent(bookId)}`;
    } else if (bookTitle) {
        searchUrl += `title=${encodeURIComponent(bookTitle)}`;
    }

    console.log("Redirecting to:", searchUrl);
    window.location.href = searchUrl; // Redirect to searchResult.html with query parameters
}

// Function to fetch search results
function fetchSearchResults() {
    console.log("fetchSearchResults function started!");

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");
    const bookTitle = params.get("title");

    console.log("Extracted search parameters:", { bookId, bookTitle });

    if (!bookId && !bookTitle) {
        console.error("No search criteria provided.");
        document.getElementById("searchResult").innerHTML = "<p>No search criteria provided.</p>";
        return;
    }

    let apiUrl = "http://localhost:8080/books/search?";
    if (bookId) {
        apiUrl += `id=${bookId}`;
    } else if (bookTitle) {
        apiUrl += `title=${encodeURIComponent(bookTitle)}`;
    }

    console.log("Fetching data from:", apiUrl);

    fetch(apiUrl)
        .then(response => {
            console.log("API Response Status:", response.status);
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log("Search API Response Data:", data);

            const resultsDiv = document.getElementById("searchResult");
            if (!resultsDiv) {
                console.error("searchResult element NOT found in searchResult.html!");
                return;
            }

            resultsDiv.innerHTML = ""; // This clears the previous results

            if (Array.isArray(data) && data.length > 0) {
                let table = "<table border='1'><tr><th>ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Status</th></tr>";
                data.forEach(book => {
                    table += `
                        <tr>
                            <td>${book.id}</td>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.genre}</td>
                            <td>${book.availabilityStatus}</td>
                        </tr>
                    `;
                });
                table += "</table>";
                resultsDiv.innerHTML = table;
            } else if (data.id) {
                resultsDiv.innerHTML = `
                    <table border='1'>
                        <tr><th>ID</th><td>${data.id}</td></tr>
                        <tr><th>Title</th><td>${data.title}</td></tr>
                        <tr><th>Author</th><td>${data.author}</td></tr>
                        <tr><th>Genre</th><td>${data.genre}</td></tr>
                        <tr><th>Status</th><td>${data.availabilityStatus}</td></tr>
                    </table>
                `;
            } else {
                resultsDiv.innerHTML = `<p>No book found.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            document.getElementById("searchResult").innerHTML = `<p>${error.message || "Failed to fetch search results."}</p>`;
        });
}
