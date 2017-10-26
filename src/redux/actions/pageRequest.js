import * as types from '../types/pageRequest'

export function setPageRequest(pageSize,pageNumber,sortDirection,sortProperty) {
    return {
        type: types.SET_PAGE_REQUEST,
        pageSize: pageSize,
        pageNumber: pageNumber,
        sortDirection: sortDirection,
        sortProperty: sortProperty,
    }
}

export function setPageNumber(pageNumber) {
    return {
        type: types.SET_PAGE_NUMBER,
        pageNumber: pageNumber,
    }
}

export function setPageRequestSizeAndNumber(pageSize,pageNumber) {
    return {
        type: types.SET_PAGE_REQUEST_SIZE_AND_NUMBER,
        pageSize: pageSize,
        pageNumber: pageNumber
    }
}

export function setPageRequestSortProperties(columnName,direction) {
    return {
        type: types.SET_PAGE_REQUEST_SORT_PROPERTIES,
        columnName: columnName,
        direction: direction
    }
}

export function setSearchCriteria(searchCriteria) {
    return {
        type: types.SET_SEARCH_CRITERIA,
        searchCriteria: searchCriteria
    }
}