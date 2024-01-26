document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('options');
    const voteButton = document.getElementById('voteButton');
    const selectedOptionDisplay = document.getElementById('selectedOption');
  
    let selectedOption = null; // New variable to store the selected option
  
    // Fetch poll data from the server
    fetch('/api/polls/example-poll')
      .then(response => response.json())
      .then(poll => {
        // Display poll options
        poll.options.forEach(option => {
          const optionButton = document.createElement('button');
          optionButton.textContent = option;
  
          optionButton.addEventListener('click', () => {
            selectedOption = option; // Store the selected option
            voteButton.disabled = false;
            selectedOptionDisplay.textContent = `Selected Option: ${option}`;
          });
  
          optionsContainer.appendChild(optionButton);
        });
  
        // Handle vote submission
        voteButton.addEventListener('click', () => {
          // Send vote to the server
          fetch('/api/votes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pollId: 'example-poll',
              selectedOption,
            }),
          });
          window.location.href = '/confirmation.html';
        });
      });
  });
  