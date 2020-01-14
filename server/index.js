require('dotenv/config');
const express = require('express');

// const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  // db.query(`select 'successfully connected' as "message"`)
  //   .then(result => res.json(result.rows[0]))
  //   .catch(err => next(err));

  res.send({
    message: 'Server Up'
  });
});

app.get('/api/products', (req, res) => {
  res.send(
    [
      {
        image: '/images/shake-weight.jpg',
        name: 'Shake Weight',
        price: 2999,
        productId: 1,
        shortDescription: 'Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.'
      },
      {
        image: '/images/shamwow.jpg',
        name: 'ShamWow',
        price: 2595,
        productId: 2,
        shortDescription: "It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!"
      },
      {
        image: '/images/snuggie.jpg',
        name: 'Snuggie',
        price: 2900,
        productId: 3,
        shortDescription: 'Super-Soft Fleece with pockets! One Size fits all Adults! Keeps you Warm & Your Hands-Free!'
      },
      {
        image: '/images/wax-vac.jpg',
        name: 'Wax Vac',
        price: 999,
        productId: 4,
        shortDescription: 'Gentle way to remove ear wax. Safe and hygienic. Reduces the risk of painful infections.'
      },
      {
        image: '/images/ostrich-pillow.jpg',
        name: 'Ostrich Pillow',
        price: 9900,
        productId: 5,
        shortDescription: 'Create your own snugly space in the world and feel-good anywhere with the ultimate cocoon pillow.'
      },
      {
        image: '/images/tater-mitts.jpg',
        name: 'Tater Mitts',
        price: 830,
        productId: 6,
        shortDescription: '8 Seconds is All You Need with Tater Mitts Quickly and easily prepare all your favorite potato dishes with Tater Mitts.'
      }
    ]
  );
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
