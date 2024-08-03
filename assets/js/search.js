document.querySelector('#search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = document.querySelector('input[name="query"]').value;
    const response = await fetch(`https://d1-database.mtzdgtlab.workers.dev?query=${query}`);
    const results = await response.json();
    
    // Mostrar los resultados en tu página
    const resultsContainer = document.querySelector('#search-results');
    resultsContainer.innerHTML = results.map(result => `
        <div>
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        </div>
    `).join('');
});
