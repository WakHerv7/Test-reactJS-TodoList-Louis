// mockHandlers.js
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { ToDo } from '../models';

type TProps = {
    todos: ToDo[],
    stateTodos: ToDo[]
}

export const setupTodoMockHandlers = ({todos, stateTodos}: TProps) => {
    
    const mock = new MockAdapter(axios);

    mock.onGet('/api/todo').reply((req)=>{
        console.log("onGet :  req.url : ", req.url);
        return[200, todos]
    });

    mock.onGet(/api\/todo\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/todo\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        stateTodos = todos;
        const index = stateTodos.findIndex((item:any) => item.id == id);
        if (index!== -1) {
        return [200, stateTodos[index]];
        } else {
        return [404, { error: 'Item not found' }];
        }
    });

    mock.onPost('/api/todo').reply((req) => {
        const newItem = JSON.parse(req.data);
        return [200, newItem];
    });
    mock.onPut(/api\/todo\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/todo\/(.+)$/);        
        if (!idMatch ||!idMatch[1]) {
            return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        const updatedItem = JSON.parse(req.data);
        stateTodos = todos;
        const index = stateTodos.findIndex((item:any) => item.id == id);
        if (index!== -1) {
            return [200, updatedItem];
        } else {
            return [404, { error: 'Item not found' }];
        }
    });

    mock.onDelete(/api\/todo\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/todo\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        stateTodos = todos;
        const index = stateTodos.findIndex((item:any) => item.id == id);
        if (index!== -1) {
        // stateTodos.splice(index, 1);
        return [200, { message: 'Item deleted' }];
        } else {
        return [404, { error: 'Item not found' }];
        }
    });

    return mock; 
};
