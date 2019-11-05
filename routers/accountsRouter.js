const express = require('express');

const accountsRouter = express.Router();

const DB = require('../data/dbConfig.js');


//getting all accounts- a list of posts - 
accountsRouter.get('/', (req, res) => {
    DB.select('*')
    //returns a promise once gets post sends it back to the client
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts) 
    })
    .catch(error =>  {
        res.status(500).json({message: "Failed to get accounts from DB"})
    })
});


//getting accounts by id - need to filer
accountsRouter.get('/:id', (req, res) => {
    DB.select ('*')
    .from('accounts')
    //select form db where id is equal to req.params.id
    .where('id', '=', req.params.id)
    //need this or it will send back an array since when you do select it is expecting you are getting
    //back a collection of things.
    .first()
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        console.log("get by id error", error);
        res.status(500).json( {error: 'There was an error retrieving account from database.'});
    })

});

//post
accountsRouter.post('/',  (req, res) => {
    //validata the data sent by the client before calling 
    DB
    .insert(req.body, 'id') //ignore the console warming on SQLite about the id
    //inserting into account
    .into('accounts')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to add account' });
    });
});
//updating data- body - [name and budget]
accountsRouter.put('/:id', (req, res) => {
    //all changes we are going to make will be in the body
    const changes = req.body;
    // validate data before calling the database
    //filter fist then do the update.
    DB('accounts')
    //first filtering- grabbing the accounts table where id is equal to req.params.id
        .where({ id: req.params.id })
        //then pass in changes coming from the body
        .update(changes)
        //then returning count with how many rows were updated.
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: 'Failed to change account from DB' });
		});
});


//delete
//getting accounts table and filtering it by id
accountsRouter.delete('/:id', (req, res) => {
    DB('accounts')
    .where( {id: req.params.id} )
    .delete()
    .then( count => { //returns the count of records that were deleted
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error deleting the account from the database.'} );
    })    

});

module.exports = accountsRouter;