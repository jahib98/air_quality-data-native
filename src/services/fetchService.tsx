import { airApi } from "./apiClient";

const getAirData = () => {
    return airApi.get('rest/data24h/');
}

export const fetchService = {
    getAirData,
}