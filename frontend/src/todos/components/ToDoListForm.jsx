import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../shared/FormFields'

const useStyles = makeStyles({
    card: {
        margin: '1rem'
    },
    todoLine: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        flexGrow: 1
    },
    standardSpace: {
        margin: '8px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }
})

export const ToDoListForm = ({ toDoList, saveToDoList, addTextToTodo, todos }) => {

    const classes = useStyles()

    const handleWriteText = (index, event) => {
        let writeTodoObj = [ // immutable update
            ...todos.slice(0, index),
            {...todos[index], name: event.target.value},
            ...todos.slice(index + 1)
        ];
        addTextToTodo(toDoList.id, writeTodoObj)
    }

    const handleAddTodo = () => {
        let addTodoObj = ([
            ...todos,
            {name: '', completed: false}
        ]);
        saveToDoList(toDoList.id, addTodoObj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveToDoList(toDoList.id, todos)
    }

    const handleDelete = index => {
        let deleteTodoObj = ([
            ...todos.slice(0, index),
            ...todos.slice(index + 1)
        ]);
        saveToDoList(toDoList.id, deleteTodoObj)
    }

    const handleCheck = index => {
        let writeTodoObj = [ // immutable update
            ...todos.slice(0, index),
            {...todos[index], completed: !todos[index].completed},
            ...todos.slice(index + 1)
        ];
        saveToDoList(toDoList.id, writeTodoObj)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component='h2'>
                    {toDoList.title}
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    {todos.map((todo, index) => (
                        <div key={index} className={classes.todoLine}>
                            <Typography className={classes.standardSpace} variant='h6'>
                                {index + 1}
                            </Typography>
                            <TextField
                                label='What to do?'
                                value={todo.name}
                                onChange={(event) => handleWriteText(index, event)}
                                className={classes.textField}
                            />
                            <Button
                                size='small'
                                color='secondary'
                                className={classes.standardSpace}
                                onClick={() => handleDelete(index)}

                            >
                                <DeleteIcon />
                            </Button>
                            <Checkbox
                                checked={todo.completed}
                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                onClick={() => handleCheck(index)}

                            />
                        </div>
                    ))}
                    <CardActions>
                        <Button
                            type='button'
                            color='primary'
                            onClick={handleAddTodo}
                        >
                            Add Todo <AddIcon />
                        </Button>
                        <Button type='submit' variant='contained' color='primary'>
                            Save
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    )
}
