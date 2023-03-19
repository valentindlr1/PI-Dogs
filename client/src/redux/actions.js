// import axios from "axios";
export const LOG = "LOG"
export const FILTER = "FILTER";
export const ORDER = "ORDER";

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