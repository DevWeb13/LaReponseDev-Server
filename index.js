require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const projectsRoutes = require('./routes/projects');

mongoose.set('strictQuery', true);

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 5000;

/* Connecting to the MongoDB database. */
mongoose
  .connect(process.env.MONGODB_URI || '', {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* Parsing the body of the request. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Allowing the frontend to access the backend. */
app.use(
  cors({
    origin: ['https://la-reponse-dev.vercel.app/', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.use(
  express.static('public', {
    setHeaders: function (res, path) {
      if (path.endsWith('.svg')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World !!');
});

/* projects */
app.use('/projects', projectsRoutes);
app.use('/projects/:id', projectsRoutes);

app.listen(PORT, () =>
  console.log('Server started at http://localhost:' + PORT)
);

module.exports = app;
