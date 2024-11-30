import {itemsHttpRequests, serverUrl} from "./interface-slice";
import {AppDispatch} from "../index";

//const test = 'http://localhost:4000';
export const initSSE = (dispatch: AppDispatch) => {
    const jsonItems = localStorage.getItem('appConfigurationItems');
    let appDate = '';

    if (jsonItems) {
        const items = JSON.parse(jsonItems);
        appDate = items.date;
    }

    const eventSource = new EventSource(`${serverUrl}/date`);

    eventSource.onopen = () => {
        console.log('SSE соединение установлено');
    };

    eventSource.onmessage = async (event) => {
        const date = await event.data;

        if ((!appDate || date !== appDate) && date) {
            dispatch(itemsHttpRequests());
            appDate = date;
        } else if (appDate && date && date === appDate){
            console.log('date is valid')
        } else if (!date) {
            console.log('no date fetched, server error');
        }

    }

    eventSource.onerror = () => {
        console.error('Ошибка SSE-соединения');
        //eventSource.close();
    };

    return eventSource;
}
