// mockHandlers.js
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

type TProps = {
    customData: any,
    stateData: any
}

export const setupMockHandlers = ({customData, stateData}: TProps) => {
    
    const mock = new MockAdapter(axios);

    mock.onGet('/api/data').reply((req)=>{
        console.log("onGet :  req.url : ", req.url);
        return[200, customData]
    });

    mock.onGet(/api\/data\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/data\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        stateData = customData;
        const index = stateData.findIndex((item:any) => item.id == id);
        if (index!== -1) {
        return [200, stateData[index]];
        } else {
        return [404, { error: 'Item not found' }];
        }
    });

    mock.onPost('/api/data').reply((req) => {
        const newItem = JSON.parse(req.data);
        return [200, newItem];
    });
    mock.onPut(/api\/data\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/data\/(.+)$/);        
        if (!idMatch ||!idMatch[1]) {
            return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        const updatedItem = JSON.parse(req.data);
        stateData = customData;
        const index = stateData.findIndex((item:any) => item.id == id);
        if (index!== -1) {
            return [200, updatedItem];
        } else {
            return [404, { error: 'Item not found' }];
        }
    });

    mock.onDelete(/api\/data\/?.*/).reply((req) => {
        const idMatch = req.url?.match(/\/api\/data\/(.+)$/);
        if (!idMatch ||!idMatch[1]) {
        return [400, { error: 'Invalid ID' }];
        }
        const id = idMatch[1];
        stateData = customData;
        const index = stateData.findIndex((item:any) => item.id == id);
        if (index!== -1) {
        stateData.splice(index, 1);
        return [200, { message: 'Item deleted' }];
        } else {
        return [404, { error: 'Item not found' }];
        }
    });

    return mock; 
};
