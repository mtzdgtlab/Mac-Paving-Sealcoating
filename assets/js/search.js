document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.df-search-form form');
    const searchInput = document.querySelector('.df-search-input input');
    const searchResults = document.createElement('div');
    searchResults.classList.add('search-results');
    document.querySelector('.df-search-form').appendChild(searchResults);

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query) {
            searchContent(query);
        }
    });

    async function searchContent(query) {
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            displayResults(results);
        } catch (error) {
            console.error('Error:', error);
            searchResults.innerHTML = '<p>An error occurred while searching</p>';
        }
    }

    function highlightKeywords(text, query) {
        const words = query.split(' ');
        let highlightedText = text;
        words.forEach(word => {
            if (word.length > 2) {
                const regex = new RegExp(`(${word})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
            }
        });
        return highlightedText;
    }

    function displayResults(results) {
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                const highlightedTitle = highlightKeywords(result.title, searchInput.value);
                const highlightedDescription = highlightKeywords(result.description, searchInput.value);
                resultItem.innerHTML = `
                    <a href="${result.url}">${highlightedTitle}</a>
                    <p>${highlightedDescription}</p>
                `;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
        }
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchForm.contains(event.target)) {
            searchResults.innerHTML = '';
        }
    });

    // Add keyup event listener for real-time search
    searchInput.addEventListener('keyup', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length >= 2) {
            searchContent(query);
        } else {
            searchResults.innerHTML = '';
        }
    });
});