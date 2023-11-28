import { AxiosResponse } from 'axios'
import axios from './axios-instance'
import { IBug } from '../types'

export const BugAPI = {
    getBugs: () => {
        return axios
            .get('/bugs')
            .then((response: AxiosResponse<IBug[]>) => response.data)
    },
    getBugById: (id: string) => {
        return axios
            .get(`/bugs/${ id }`)
            .then((response: AxiosResponse<IBug>) => response.data)
    },
    deleteBug: (id: string) => {
        return axios
            .delete(`/bugs/${ id }`)
            .then((response: AxiosResponse<string>) => response.data)
    },
    updateBug: (id: string, bug: IBug) => {
        return axios
            .put(`/bugs/${ id }`, bug)
            .then((response: AxiosResponse<IBug>) => response.data)
    },
    createBug: (bug: IBug) => {
        return axios
            .post('/bugs', bug)
            .then((response: AxiosResponse<IBug>) => response.data)
    }
}