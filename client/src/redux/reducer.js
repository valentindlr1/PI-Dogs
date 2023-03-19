import { LOG } from "./actions";


const initialState = {
    access: false
};

const rootReducer = (state = initialState, action) => {
  
    switch(action.type){
        
        case LOG:
            return {
                ...state,
                access: action.payload
            }
            
        // case ORDER:
        //     if(action.payload === "Select" && !filtrado) return {...state, allCharacters: [...state.myFavorites]}
        //     if(action.payload === "Select" && filtrado) return {...state}
        //     filtrado2 = true;
        //     let arrOrderAscendente = [...state.myFavorites].sort((a, b)=> a.id - b.id);
        //     let arrOrderDescendente = [...state.myFavorites].sort((a, b)=> b.id - a.id);
        //     if(action.payload === "Ascendente"){
        //         return{
        //             ...state,
        //             allCharacters: arrOrderAscendente
        //         }
        //     }
        //     if(action.payload === "Descendente"){
        //         return{
        //             ...state,
        //             allCharacters: arrOrderDescendente
        //         }
        //     }
            
        default: return {...state}
    }

}

export default rootReducer