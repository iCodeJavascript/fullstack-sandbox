import { API_ENDPOINT } from './config';

export const getTodoListsRequest = () => {
    return fetch(`${API_ENDPOINT}/todoLists`)
        .then(res => res.json())
        .catch((e) => {
            throw new Error(e);
        })
        .then(json => {
            return json;
        })
        .catch((e) => {
            throw new Error(e);
        })
}

export const createPut = (body) => {
    return {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        body: JSON.stringify(body) // We send data in JSON format
    }
}

export const updateTodoListRequest = (id, body) => {
    return fetch(`${API_ENDPOINT}/todoLists/${id}`, createPut(body))
        .then(res => res.json())
        .catch((e) => {
            throw new Error(e);
        })
        .then(json => {
            return json;
        })
        .catch((e) => {
            throw new Error(e);
        })
}