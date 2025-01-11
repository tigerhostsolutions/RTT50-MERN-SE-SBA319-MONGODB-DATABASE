import express from 'express';
const app = express();

import Muscular_System from 'models/muscular_system.mjs';

app.get('/api/ap/muscular_system', (req, res) => {
  const name = req.query;
  let filtered_muscles = Muscular_System;
  if (name) {
    filtered_muscles = filtered_muscles.filter((muscles) =>
        muscles.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  res.json(filtered_muscles);
});