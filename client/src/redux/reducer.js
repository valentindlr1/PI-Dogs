import { LOG, PAGE, ORDER, FILTER, SET_DOGS } from "./actions";

const initialState = {
  access: false,
  pages: {},
  filtered: [],
  dogs: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG:
      return {
        ...state,
        access: action.payload,
      };
    case PAGE:
      let count = 0;
      let page = 1;
      let aux = {};

      for (let i = 0; i < action.payload.length; i++) {
        if (count < 8) {
          if (count === 0) {
            aux = { ...aux, [page]: [action.payload[i]] };
            count++;
          } else {
            aux = { ...aux, [page]: [...aux[page], action.payload[i]] };
            count++;
          }
        } else {
          page++;
          aux = { ...aux, [page]: [action.payload[i]] };
          count = 1;
        }
      }

      return {
        ...state,
        pages: { ...aux },
      };

    case FILTER:
      let auxx = [];
      var { myCreated, checkedTemp, tempsSelected } = action.payload;

      if (checkedTemp) {
        state.dogs.forEach((dog) => {
          if (myCreated) {
            if (typeof dog.id === "string") {
              if (
                tempsSelected.every((temp) => {
                  return dog.temperament.includes(temp);
                })
              )
                auxx.push(dog);
            }
          } else {
            if (
              tempsSelected.every((temp) => {
                return dog.temperament.includes(temp);
              })
            )
              auxx.push(dog);
          }
        });
      } else {
        if (myCreated) {
          state.dogs.forEach((dog) => {
            if (typeof dog.id === "string") {
              auxx.push(dog);
            }
          });
        } else auxx = auxx.filter((dog) => typeof dog.id === "number");
      }
      
      return {
        ...state,
        filtered: [...auxx],
      };

    case ORDER:
      var {option, myCreated, checkedTemp, tempsSelected} = action.payload;
      
      if (myCreated || checkedTemp) {
        let auxOrder = [...state.filtered];
        if (option === "Ascending") {
          auxOrder.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (option === "Descending") {
          auxOrder.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (option === "Ascending Weight") {
          auxOrder.sort(
            (a, b) =>
              Number(a.weight.split(" ")[0]) - Number(b.weight.split(" ")[0])
          );
        }
        if (option === "Descending Weight") {
          auxOrder.sort(
            (a, b) =>
              Number(b.weight.split(" ")[0]) - Number(a.weight.split(" ")[0])
          );
        }
        
        return {
          ...state,
          filtered: [...auxOrder],
        };
      } else {
        let auxOrder = [...state.dogs];
        if (option === "Ascending") {
          auxOrder.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (option === "Descending") {
          auxOrder.sort((a, b) => b.name.localeCompare(a.name));
        }
        if (option === "Ascending Weight") {
          auxOrder.sort(
            (a, b) =>
              Number(a.weight.split(" ")[0]) - Number(b.weight.split(" ")[0])
          );
        }
        if (option === "Descending Weight") {
          auxOrder.sort(
            (a, b) =>
              Number(b.weight.split(" ")[0]) - Number(a.weight.split(" ")[0])
          );
        }
        
        return {
          ...state,
          dogs: [...auxOrder]
        };
      }

    case SET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
