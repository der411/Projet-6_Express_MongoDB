const e = require('express');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

 app.post('/api/books', (req, res, next) => {
   console.log(req.body);
   res.status(201).json({
     message: 'Objet créé !'
   });
 });

app.get('/api/books', (req, res, next) => {;
const books = [
   {
     id: '1',
     userId: '1',
     title: 'Les Misérables',
     author: 'Victor Hugo',
     year: 1862,
     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Les_Mis%C3%A9rables_by_Victor_Hugo.jpg',
     genre: 'Classique',
     ratings: [
       { userId: '1', grade: 5 },
       { userId: '2', grade: 4 },
     ],
     averageRating: 4.5,
   },
];
res.status(200).json(books);
});

module.exports = app;