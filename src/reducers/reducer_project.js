import {
    FETCH_PROJECTS,
    FETCH_PROJECT_CURRENT,
} from '../actions/action_project';



const INITIAL_STATE = {
    list: [], // List all the Projects
    current: [],  // Current Project User is Viewing
};


export default function(state = INITIAL_STATE, action) {
    let error;
    
    if(undefined==action.payload) {
        return state;
    }
    
    switch (action.type) {
        case FETCH_PROJECTS:
            return {...state, list: action.payload.data };
        case FETCH_PROJECT_CURRENT:
            return {...state, current: action.payload.data };
        default:
            return state;
    }
}
