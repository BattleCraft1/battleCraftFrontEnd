import createReducer from '../lib/createReducer'
import * as types from '../types/page'

export const page = createReducer( {}, {
    [types.SET_PAGE]( state, action ) {
        action.page.content.forEach((element) =>{
                let previousElement=state.content.find(previousElement1 => previousElement1.name===element.name);
                if(previousElement!==undefined && previousElement.hasOwnProperty('checked')){
                    element.checked=previousElement.checked;
                }
                else
                    element.checked=false;
            }
        );
        console.log(action.page);
        return action.page;
    },

    [types.CHECK_ALL_ELEMENTS]( state, action ){
        state.content.forEach(element => {
            element.checked=action.checked;
        });
        return Object.create(state);
    },

    [types.CHECK_ELEMENT]( state, action ){
        let elementToCheck=state.content.find(element => element.name===action.value);
        elementToCheck.checked=action.checked;
        return Object.create(state);
    }
} );
