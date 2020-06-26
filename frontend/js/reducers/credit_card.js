export default function tithe(state = [], action){    
    switch (action.type){
        case 'ADD_CREDIT_CARD':                        
            return action.credit_card
        default:
            return state;
    }
}