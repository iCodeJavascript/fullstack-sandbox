import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import DoneIcon from '@material-ui/icons/Done';
import { getTodoListsRequest, updateTodoListRequest } from '../../api';

const ErrorMessage = ({error}) => {
    return (<div>{JSON.stringify(error, Object.getOwnPropertyNames(error))}</div>)
}
export const ToDoLists = ({ style }) => {

    const [error, setError] = useState({})
    const [toDoLists, setToDoLists] = useState({})
    const [activeList, setActiveList] = useState()

    const checkIfListIsCompleted = (toDoList) => {
        const todos = toDoList.todos;
        if (!todos) return
        const allCompletedTodos = todos.filter((todo) => todo.completed === true);
        const isListCompleted = allCompletedTodos.length === todos.length && todos.length > 0 ? true : false;
        return isListCompleted;
    }

    const addTextToTodo = (id, todos) => {
        const listToUpdate = toDoLists[id]
        const updatedList = {...listToUpdate, todos}
        const updatedToDoList = toDoLists.map((list) => {
            if (list.id === id) {
                return updatedList
            }
            return list
        })
        setToDoLists(updatedToDoList);
    }

    const saveTodoList = (id, todos) => {
        const listToUpdate = toDoLists[id]
        const updateTodoListDto = {...listToUpdate, todos}
        updateTodoListRequest(id, updateTodoListDto).then((json) => {
            setToDoLists(json);
        }).catch((error) => {
            setError(error)
        })
    }

    useEffect(() => {
        getTodoListsRequest()
            .then((json) => {
                setToDoLists(json);
            })
            .catch((error) => {
                setError(error)
            })
    }, [])

    if (!Object.keys(toDoLists).length) return <ErrorMessage error={error}/>
    return (<Fragment>
        <Card style={style}>
            <CardContent>
                <Typography
                    component='h2'
                >
                    My ToDo Lists
                </Typography>
                <List>
                    {Object.keys(toDoLists).map((key) => <ListItem
                        key={key}
                        button
                        onClick={() => setActiveList(key)}
                    >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={toDoLists[key].title}/>
                        {checkIfListIsCompleted(toDoLists[key]) ? <DoneIcon /> : ''}
                    </ListItem>)}
                </List>
            </CardContent>
        </Card>
        {toDoLists[activeList] && <ToDoListForm
            key={activeList} // use key to make React recreate component to reset internal state
            todos={toDoLists[activeList].todos}
            toDoList={toDoLists[activeList]}
            saveToDoList={saveTodoList}
            addTextToTodo={addTextToTodo}
        />}
    </Fragment>)
}