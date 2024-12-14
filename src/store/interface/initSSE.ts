import {itemsHttpRequests, serverUrl} from "./interface-slice";
import {AppDispatch} from "../index";

export const initSSE = (dispatch: AppDispatch) => {
    const jsonItems = localStorage.getItem('appConfigurationItems');
    let currentAppDate = '';
    let currentAppVersion = '';

    if (jsonItems) {
        try {
            ({githubCommitDate: currentAppDate, appVersion: currentAppVersion } = JSON.parse(jsonItems));
        } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            return;
        }
    }

    const eventSource = new EventSource(`${serverUrl}/api/ctrlinfo`);

    eventSource.onopen = () => {
        console.log('SSE соединение установлено');
    };

    eventSource.onmessage = (event) => {
        let githubCommitDate, appVersion;

        try {
            ({ githubCommitDate, appVersion } = JSON.parse(event.data));
        } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            return;
        }

        if (!githubCommitDate || !appVersion) {
            console.log('No date/version fetched, server error');
            return;
        }

        if (githubCommitDate !== currentAppDate || appVersion !== currentAppVersion) {
            dispatch(itemsHttpRequests());
            currentAppDate = githubCommitDate;
            currentAppVersion = appVersion;
        } else {
            console.log('githubCommitDate and appVersion are valid');
        }
    }

    eventSource.onerror = () => {
        console.error('Ошибка SSE-соединения');
        //eventSource.close();
    };

    return eventSource;
}
