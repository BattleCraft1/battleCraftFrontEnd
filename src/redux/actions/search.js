import * as types from '../types/search'

export function showSearchPanel(show) {
    return {
        type: types.SHOW_SEARCH_PANEL,
        show: show
    }
}