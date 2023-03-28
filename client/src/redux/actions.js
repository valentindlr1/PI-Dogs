// import axios from "axios";
export const LOG = "LOG";
export const PAGE = "PAGE";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const SET_DOGS = "SET_DOGS";
export const DELETE = "DELETE";
export const EDIT = "EDIT";

export function login() {
  return {
    type: LOG,
    payload: true,
  };
}

export function logout() {
  return {
    type: LOG,
    payload: false,
  };
}

export function paginate(allDogs) {
  return {
    type: PAGE,
    payload: allDogs,
  };
}

export function filter(myCreated, checkedTemp, tempsSelected) {
  return {
    type: FILTER,
    payload: { myCreated, checkedTemp, tempsSelected },
  };
}

export function order(option, myCreated, checkedTemp, tempsSelected) {
  return {
    type: ORDER,
    payload: { option, myCreated, checkedTemp, tempsSelected },
  };
}

export function setDogs(dogs) {
  return {
    type: SET_DOGS,
    payload: dogs,
  };
}

export function deleteDog(id) {
  return {
    type: DELETE,
    payload: id,
  };
}

export function editDog(dog) {
  return {
    type: EDIT,
    payload: dog,
  };
}
