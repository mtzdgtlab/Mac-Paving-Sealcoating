document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.df-search-form form');
    const searchInput = document.querySelector('.df-search-input input');
    const searchResults = document.createElement('div');
    searchResults.classList.add('search-results');
    document.querySelector('.df-search-form').appendChild(searchResults);

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query) {
            // Aquí puedes agregar la lógica para buscar en tu contenido
            // Por ejemplo, buscar en un índice predefinido o en el contenido de la página
            const results = searchContent(query);
            displayResults(results);
        }
    });

    function searchContent(query) {
        // Esta función debe devolver los resultados de la búsqueda
        // Aquí puedes agregar tu lógica de búsqueda
        // Por ejemplo, buscar en un índice predefinido o en el contenido de la página
        const content = [
            { title: 'Asphalt Paving', url: 'asphalt_paving.html' },
            { title: 'Sealer', url: 'sealer.html' },
            { title: 'Masonry', url: 'masonry.html' },
            { title: 'Concrete', url: 'concrete.html' },
            { title: 'Landscaping', url: 'landscaping.html' }
        ];

        return content.filter(item => item.title.toLowerCase().includes(query));
    }

    function displayResults(results) {
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `<a href="${result.url}">${result.title}</a>`;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = '<p>No results found</p>';
        }
    }
});