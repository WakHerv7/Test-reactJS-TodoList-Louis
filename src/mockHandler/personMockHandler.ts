// mockHandlers.js
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Person } from '../models';

type TProps = {
    persons: Person[],
    statePersons: Person[]
}

export const setupPersonMockHandlers = ({persons, statePersons}: TProps) => {
    
    const mock = new MockAdapter(axios);

    mock.onGet('/api/person').reply((req)=>{
        console.log("onGet :  req.url : ", req.url);
        return[200, persons]
    });

    mock.onGet(/api\/person\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/person\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        statePersons = persons;
        const index = statePersons.findIndex((item:any) => item.id == id);
        if (index!== -1) {
        return [200, statePersons[index]];
        } else {
        return [404, { error: 'Item not found' }];
        }
    });

    mock.onPost('/api/person').reply((req) => {
        const newItem = JSON.parse(req.data);
        return [200, newItem];
    });
    mock.onPut(/api\/person\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/person\/(.+)$/);        
        if (!idMatch ||!idMatch[1]) {
            return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        const updatedItem = JSON.parse(req.data);
        statePersons = persons;
        const index = statePersons.findIndex((item:any) => item.id == id);
        if (index!== -1) {
            return [200, updatedItem];
        } else {
            return [404, { error: 'Item not found' }];
        }
    });

    mock.onDelete(/api\/person\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/person\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        statePersons = persons;
        const index = statePersons.findIndex((item:any) => item.id == id);
        
        
        if ( index != -1 ) {
            console.log("mock.onDelete(/api/person)", index, id);
            // statePersons.splice(index, 1);
            return [200, { message: 'Item deleted' }];
        } else {
            return [404, { error: 'Item not found' }];
        }
    });

    return mock; 
};
