export default function tithe(state = [], action){    
    switch (action.type){
        case 'ADD_VALUE_TITHE':                        
            return action.tithe
        default:
            return state;
    }
}