document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('results');

  fetch('/api/votes/example-poll')
      .then(response => response.json())
      .then(votes => {
          const allOptions = ['Manchester City', 'Arsenal', 'Liverpool'];
          const allResults = allOptions.reduce((obj, option) => {
              obj[option] = votes[option] || 0;
              return obj;
          }, {});

          const sortedResults = Object.entries(allResults)
              .sort(([, a], [, b]) => b - a)
              .reduce((obj, [key, value]) => {
                  obj[key] = value;
                  return obj;
              }, {});

          for (const option in sortedResults) {
              const totalVotes = Object.values(allResults).reduce((a, b) => a + b, 0);
              const percentage = totalVotes === 0 ? 0 : Math.round((sortedResults[option] / totalVotes) * 100);
              const optionContainer = document.createElement('div');
              
              const resultItem = document.createElement('div');
              resultItem.classList.add('result-item');
              resultItem.textContent = `${option} ${percentage}%`;

              const color = `linear-gradient(90deg, #996BF9 ${percentage}%, rgb(140, 140, 140, 0.3) ${percentage}%)`;
              resultItem.style.background = color;
              optionContainer.appendChild(resultItem);
              resultsContainer.appendChild(optionContainer);
          }
      });
});
