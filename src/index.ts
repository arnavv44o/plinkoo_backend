import express from "express";
import cors from "cors";
import { outcomes } from "./outcomes";  // Make sure the outcomes module is correctly implemented and imported

const app = express();

// Enable CORS to allow requests from different origins
app.use(cors({ origin: '*' }));

// Middleware to parse incoming JSON requests
app.use(express.json());

const TOTAL_DROPS = 16;

const MULTIPLIERS: { [key: number]: number } = {
  0: 16,
  1: 9,
  2: 2,
  3: 1.4,
  4: 1.4,
  5: 1.2,
  6: 1.1,
  7: 1,
  8: 0.5,
  9: 1,
  10: 1.1,
  11: 1.2,
  12: 1.4,
  13: 1.4,
  14: 2,
  15: 9,
  16: 16,
};

// Route to handle the game logic
app.post("/game", (req, res) => {
  console.log("Received request body:", req.body);  // Log the request body for debugging

  let outcome = 0;
  const pattern = [];

  // Simulate the ball drop logic
  for (let i = 0; i < TOTAL_DROPS; i++) {
    if (Math.random() > 0.5) {
      pattern.push("R");
      outcome++;
    } else {
      pattern.push("L");
    }
  }

  const multiplier = MULTIPLIERS[outcome];
  const possibleOutcomes = outcomes[outcome];

  // Send the calculated point and multiplier back to the client
  res.send({
    point: possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length || 0)],
    multiplier,
    pattern,
  });
});

// Use the PORT from environment variables for deployment, or default to port 3000 for local development
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
