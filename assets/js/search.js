document.querySelector('#search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = document.querySelector('input[name="query"]').value;
    try {
        const response = await fetch(`https://d1-database.mtzdgtlab.workers.dev?query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();
        const resultsContainer = document.querySelector('#search-results');
        resultsContainer.innerHTML = results.map(result => `
            <div>
                <h3>${result.name}</h3>
                <p>${result.description}</p>
            </div>
        `).join('');
    } catch (error) {
        const resultsContainer = document.querySelector('#search-results');
        resultsContainer.innerHTML = `<p>An error occurred while searching</p>`;
    }
});
