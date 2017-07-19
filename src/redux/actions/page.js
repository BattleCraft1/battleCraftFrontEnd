import * as types from '../types/page'

export function setPage(page) {
    return {
        type: types.SET_PAGE,
        page: page
    }
}