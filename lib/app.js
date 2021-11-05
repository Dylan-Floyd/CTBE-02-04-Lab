const express = require('express');
const app = express();
const userRoutes = require('./controllers/users.js');
const ensureAuth = require('./middleware/ensureAuth.js');
const roomsRoutes = require('./controllers/rooms.js');
const messagesRoutes = require('./controllers/messages.js');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/api', ensureAuth);

app.use('/api/v1/rooms', roomsRoutes);
app.use('/api/v1/rooms', messagesRoutes); //messages can only be accessed by room

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
