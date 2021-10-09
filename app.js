const express = require('express');
const connectDB = require('./config/db');


const app = express();

const scrapeRoute = require('./scrapperRouter');

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res, next) => res.send('API Running...'));

app.use('/api/scrape/', scrapeRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


