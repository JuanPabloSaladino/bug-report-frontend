import axios, { AxiosResponse } from 'axios'
import { IBug } from '../types'

export const BugAPI = {
    getBugs: () => {
        return axios
            .get('http://localhost:8080/api/bugs')
            .then((response: AxiosResponse<IBug[]>) => response.data)
    },
    getBugById: (id: string) => {
        return axios
            .get(`http://localhost:8080/api/bugs/${ id }`)
            .then((response: AxiosResponse<IBug>) => response.data)
    },
    deleteBug: (id: string) => {
        return axios
            .delete(`http://localhost:8080/api/bugs/${ id }`)
            .then((response: AxiosResponse<string>) => response.data)
    },
    updateBug: (id: string, bug: IBug) => {
        return axios
            .put(`http://localhost:8080/api/bugs/${ id }`, bug)
            .then((response: AxiosResponse<IBug>) => response.data)
    }
}