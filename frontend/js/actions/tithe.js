export function addValueTithe(value){    
    return {
        type: 'ADD_VALUE_TITHE',
        tithe: {"value" : value},
    }
}