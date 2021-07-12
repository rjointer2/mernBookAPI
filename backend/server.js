
//PORT

const PORT = process.env.PORT || 3001;

// packages required

require('dotenv').config();
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// Schemas

const { typeDefs, resolvers } = require('./schema');


// Auth Middleware

const { authMiddleware } = require('./utils/auth');

// app invoked;

const app = express();

// Use JSON application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server 

const server = new ApolloServer({
    // Type Definitions Here
    typeDefs,
    // Resolvers Here
    resolvers,
    // Middleware Here
    context: authMiddleware
});

server.applyMiddleware({ app });


/* On windows  */

app.use(express.static(path.join(__dirname, '../client/build')));

// App routes 

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    console.log('ok');
  });

// Database connection

mongoose.connect(`mongodb+srv://${process.env.UN}:${process.env.PW}@booksapi.1enan.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        app.listen(PORT, () => {
        console.log('Listening for request')
    })
    }).catch(err => {
        console.log('failed')
        console.log(err)
});


module.exports = mongoose.connection; 