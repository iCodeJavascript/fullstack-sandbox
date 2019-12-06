const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const todoListsService = require('./todoListsService');
const app = express()
app.use(cors())
app.use(bodyParser.json());
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/todoLists', (req, res) => {
    try {
        const todoLists = todoListsService.getTodoLists();
        res.status(200).json(todoLists)
    }
    catch (e) {
        const jsonError = (JSON.stringify(e, Object.getOwnPropertyNames(e)));
        res.status(500).json(JSON.stringify(jsonError));
    }
});

app.put('/todoLists/:id', (req, res) => {
    try {
        const response = todoListsService.updateTodoList(req.params.id, req.body);
        res.status(200).json(response)
    }
    catch (e) {
        const jsonError = (JSON.stringify(e, Object.getOwnPropertyNames(e)));
        res.status(500).json(jsonError);
    }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
