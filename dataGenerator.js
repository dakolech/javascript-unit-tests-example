import { apiCall } from './api';
import { config } from './config';

const URL = config.url;

export async function dataGenerator(name) {
    if (typeof name === 'string') {
        const status = await apiCall(URL, name);

        if (status) {
            return { name, status };
        }

        return { status };
    }

    if (typeof name === 'function') {
        const nameValue = name();
        const status = await apiCall(URL, nameValue);

        return { name: nameValue, status };
    }

    return null;
}
