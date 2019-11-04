const express = require('express');

const accountsRouter = express.Router();

const DB = require('../data/dbConfig.js');


accountsRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    DB('accounts')
    .where({ id })
    .first()
    .then(account => {
        if(account){
            res.status(200).json(account);
        }
        else {
            res.status(404).json( {message: 'No account with that ID found'} );
        }
    })
    .catch(error => {
        console.log("get by id error", error);
        res.status(500).json( {error: 'There was an error retrieving account from database.'});
    })

});

accountsRouter.post('/',  (req, res) => {
    const { name, budget } = req.body;

    db("accounts").insert({ name, budget })
    .then(accounts => {
        res.json(accounts) 
    }) 
    .catch(error => {
        res.status(500).json({message: "Server Error retrieving account from database"})
    })    
})


accountsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(changes.name === "" || changes.budget === ""){
        res.status(400).json ( {message: 'Name and budget are required.'} );
    }
    else {
        accountDB('accounts')
        .where({ id })
        .update(changes)
        .then (count => {
            res.status(200).json( {message: 'Account was updated'} );
        })
        .catch (error => {
            res.status(500).json( {error: 'Server error when updating that account'} );
        })
    }
});

accountsRouter.delete('/:id', (req, res) => {

    const {id} = req.params;

    accountDB('accounts')
    .where( {id} )
    .delete()
    .then( count => { //returns the count of records that were deleted
        res.status(200).json( {message: `Deleted ${count} record(s).`});
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error deleting the account from the database.'} );
    })    

});

module.exports = accountsRouter;