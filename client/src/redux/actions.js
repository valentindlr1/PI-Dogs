// import axios from "axios";
export const LOG = "LOG"
export const PAGE = "PAGE";
export const ORDER = "ORDER";
export const FILTER = "FILTER";

export function login(){
    return {
        type: LOG,
        payload: true
    }
}

export function logout(){
    return {
        type: LOG,
        payload: false
    }
}

export function paginate (allDogs) {
    return {
        type: PAGE,
        payload: allDogs
    }
}

export function filter (dogs, myCreated, checkedTemp, tempsSelected) {

    return {
        type: FILTER,
        payload: {dogs, myCreated, checkedTemp, tempsSelected}
    }

}

export function order (option, fil) {
    return {
        type: ORDER,
        payload: {option, fil}
    }
}