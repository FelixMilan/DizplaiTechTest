const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Example poll data
const examplePoll = {
  id: 'example-poll',
  question: 'Who will win the',
  question: 'Premier League?',
  options: ['Manchester City', 'Arsenal', 'Liverpool'],
};

// In-memory storage for votes
const votes = {};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/polls/example-poll', (req, res) => {
  res.json(examplePoll);
});

app.post('/api/votes', (req, res) => {
  const { pollId, selectedOption } = req.body;
  if (!votes[pollId]) {
    votes[pollId] = {};
  }

  votes[pollId][selectedOption] = (votes[pollId][selectedOption] || 0) + 1;

  res.json({ success: true });
});

app.get('/api/votes/:pollId', (req, res) => {
  const pollId = req.params.pollId;
  const pollVotes = votes[pollId] || {};
  res.json(pollVotes);
});

// Default route handler for serving the Voting Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
