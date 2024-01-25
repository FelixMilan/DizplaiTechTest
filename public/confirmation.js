document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results');
  
    // Fetch poll results from the server
    fetch('/api/votes/example-poll')
      .then(response => response.json())
      .then(votes => {
        // Create an object with all options and their vote counts
        const allOptions = ['Manchester City', 'Arsenal', 'Liverpool']; // Replace with your actual list of options
        const allResults = allOptions.reduce((obj, option) => {
          obj[option] = votes[option] || 0;
          return obj;
        }, {});
  
        // Display results in descending order of votes
        const sortedResults = Object.entries(allResults)
          .sort(([, a], [, b]) => b - a)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
  
        for (const option in sortedResults) {
          const totalVotes = Object.values(allResults).reduce((a, b) => a + b, 0);
          const percentage = totalVotes === 0 ? 0 : Math.round((sortedResults[option] / totalVotes) * 100);
          const resultItem = document.createElement('div');
          resultItem.textContent = `${option}: ${percentage}%`;
          resultsContainer.appendChild(resultItem);
        }
  
        // Display the selected option
        const selectedOptionItem = document.createElement('div');
        selectedOptionItem.textContent = `Selected Option: ${selectedOption}`;
        resultsContainer.appendChild(selectedOptionItem);
      });
  });
  