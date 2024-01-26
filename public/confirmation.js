document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('results');

  // Fetch poll results from the server
  fetch('/api/votes/example-poll')
      .then(response => response.json())
      .then(votes => {
          // Create an object with all options and their vote counts
          const allOptions = ['Manchester City', 'Arsenal', 'Liverpool'];
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

              // Create a new div for each option
              const optionContainer = document.createElement('div');
              optionContainer.classList.add('option-container');
              
              const resultItem = document.createElement('div');
              resultItem.classList.add('result-item');
              resultItem.textContent = `${option} ${percentage}%`;

              const color = `linear-gradient(90deg, #996BF9 ${percentage}%, rgb(140, 140, 140, 0.3) ${percentage}%)`;
              resultItem.style.background = color;

              // Append the result item to the option container
              optionContainer.appendChild(resultItem);

              // Append the option container to the results container
              resultsContainer.appendChild(optionContainer);
          }
      });
});
