import "./Home.modules.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, order, setDogs } from "../../redux/actions";

export default function Home() {
  const [show, setShow] = useState(false);
  const [temps, setTemps] = useState([]);
  const [checkedTemp, setChecked] = useState(false);
  const [tempsSelected, setSelected] = useState([]);
  const [myCreated, setMyCreated] = useState(false);
  const [saveSelected, setSave] = useState([]);

  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.filtered);
  const dogs = useSelector((state) => state.dogs);
  

  const onSearch = async (input) => {
    try {
      if (input !== "") {
        const result = await axios.get(
          "http://localhost:3001/name?name=" + input
        );
        const found = result.data;
        dispatch(setDogs(found));
      } else {
        gets();
      }
    } catch (error) {
      dispatch(setDogs([]));
    }
  };
  const gets = async () => {
    const perros = await axios.get("http://localhost:3001/dogs");
    dispatch(setDogs(perros.data));
  };
  function handleTemps(event, value) {
    if (event.target.className === "eachTemp") {
      event.target.className = "markedTemp";
      setSelected([...tempsSelected, value]);
    } else {
      event.target.className = "eachTemp";
      setSelected([...tempsSelected].filter((temp) => temp !== value));
    }
  }
  function handleFilterTemp(event) {
    if (event.target.checked) {
      setChecked(true);
      if (saveSelected.length) {
        setSelected(saveSelected);
      }
    } else {
      setChecked(false);
      setSave(tempsSelected);
      setSelected([]);
    }
  }

  const allTemps = temps.map((t, index) => (
    <span
      className="eachTemp"
      name="temperament"
      value={t}
      onClick={(event) => {
        handleTemps(event, t);
      }}
      key={index}
    >
      {t}
    </span>
  ));

  function handleOrder(event) {
    const option = event.target.value;

    return dispatch(order(option, myCreated, checkedTemp, tempsSelected));
  }
  function handleFilters() {
    dispatch(filter(myCreated, checkedTemp, tempsSelected));
  }

  useEffect(() => {
    gets();
    axios
      .get("http://localhost:3001/temperaments")
      .then((res) => res.data)
      .then((arr) => {
        setTemps(arr);
      })
      .catch((err) => console.log(err.message));

    // FILTROS:

    handleFilters();
  }, [myCreated, checkedTemp, tempsSelected]);

  return (
    <div className="homePage">
      <h2 className="homeTitle">HOME</h2>
      <div className="searchDiv">
        <SearchBar search={onSearch} />
        <label className="order">
          {"Order by... "}
          <select
            onChange={(event) => handleOrder(event)}
            className="selectOrder"
          >
            <optgroup label="Alphabetic Order">
              <option>Ascending</option>
              <option>Descending</option>
            </optgroup>
            <optgroup label="Weight">
              <option>Ascending Weight</option>
              <option>Descending Weight</option>
            </optgroup>
          </select>
        </label>

        <button
          className="filter"
          onClick={() => {
            setShow(!show);
          }}
        >
          Filters 🔍
        </button>
      </div>

      <Cards
        dogs={!tempsSelected.length && !myCreated ? dogs : filtered}
        flag={
          ((!filtered.length && !!tempsSelected.length) || !dogs.length) &&
          "flag"
        }
      />

      <div className={(show && "doShow") || "notShow"}>
        <h2>Filtrar por:</h2>
        <div>
          <div className="filterDiv">
            <label className="filterText">
              <input
                type="checkbox"
                onClick={() => setMyCreated(!myCreated)}
              ></input>
              Mis creaciones
            </label>
          </div>
          <div>
            <label className="filterText">
              <input type="checkbox" onClick={handleFilterTemp}></input>
              Temperamentos
            </label>
          </div>
        </div>

        <div className={checkedTemp ? "allTemps" : "notShow"}>{allTemps}</div>
        <div>
          <button className="closeTemps" onClick={() => setShow(false)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
