document.addEventListener('DOMContentLoaded', () => {
  const optionsContainer = document.getElementById('options');
  const voteButton = document.getElementById('voteButton');
  const selectedOptionDisplay = document.getElementById('selectedOption');
  let selectedOption = null;
  
  fetch('/api/polls/example-poll')
  .then(response => response.json())
  .then(poll => {
    poll.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
  
      optionButton.addEventListener('click', () => {
        selectedOption = option;
        voteButton.disabled = false;
        selectedOptionDisplay.textContent = `Selected Option: ${option}`;
      });
  
        optionsContainer.appendChild(optionButton);
    });
  
    voteButton.addEventListener('click', () => {
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
  