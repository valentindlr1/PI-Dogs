import "./Form.modules.css";
import validate from "./validate";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Form() {
  const [newDog, setDog] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life: "",
    image: "",
    temperament: [],
  });
  const [errors, setErrors] = useState({});
  const [temps, setTemps] = useState([]);
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [save, setSave] = useState([]);

  function handleChange(event) {
    setDog({
      ...newDog,
      [event.target.name]: event.target.value,
    });

    setErrors(validate(newDog, event.target.name));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !newDog.name.length ||
      !newDog.weightMin.length ||
      !newDog.weightMax.length ||
      !newDog.heightMin.length ||
      !newDog.heightMax.length ||
      !newDog.life.length ||
      !newDog.temperament.length
    ) {
      setIncomplete(true);
      return;
    }
    setIncomplete(false);

    await axios.get('http://localhost:3001/dogs')
    .then(res => res.data)
    .then(dogs => {
      dogs.forEach(dog => {
        if (dog.name === newDog.name) return setErrors({...errors, existingName: true})
      })
    })

    await axios.post("http://localhost:3001/dogs", {
      dog: {
        name: newDog.name,
        weight: newDog.weightMin + " - " + newDog.weightMax,
        height: newDog.heightMin + " - " + newDog.heightMax,
        life_span: newDog.life,
        image: newDog.image,
      },
      temperament: newDog.temperament,
    });
    setAdded(true);
    setDog({
      name: "",
      weightMin: "",
      weightMax: "",
      heightMin: "",
      heightMax: "",
      life: "",
      image: "",
      temperament: [],
    });
  }

  function handleTemps(event, value) {
    if (event.target.className === "eachTemp") {
      event.target.className = "markedTemp";
      setDog({
        ...newDog,
        temperament: [...newDog.temperament, value],
      });
      setSave([...save, event.target]);
    } else {
      event.target.className = "eachTemp";
      setDog({
        ...newDog,
        temperament: [...newDog.temperament].filter((t) => t !== value),
      });
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

  const selectedTemps = newDog.temperament.map((t, index) => (
    <span className="markedTemp" key={index}>
      {t}
    </span>
  ));

  useEffect(() => {
    axios
      .get("http://localhost:3001/temperaments")
      .then((res) => res.data)
      .then((arr) => {
        setTemps(arr);
      })
      .catch((err) => console.log(err.message));
  }, [newDog]);

  return (
    <div className="container">
      <div className={(show && "doShow") || "notShow"}>
        <div>
          <h2 className="tempTitle">Select Temperaments</h2>
        </div>
        <div className="allTemps">{allTemps}</div>
        <div>
          <button className="closeTemps" onClick={() => setShow(false)}>
            Accept
          </button>
        </div>
      </div>
      <div className={(added && "added") || "notAdded"}>
        <div>
          <h2 className="addedText">Breed added successfully!</h2>
        </div>
        <div>
          <button className="closeTemps" onClick={() => setAdded(false)}>
            Accept
          </button>
        </div>
      </div>
      <div className={(incomplete || errors.existingName) ? "incompleteData" : "completedData"}>
        <div>
          <h2>{errors.existingName ? "Name already exists" : "Please complete the fields"}</h2>
        </div>
        <div>
          <button className="closeTemps" onClick={() => setIncomplete(false)}>
            Accept
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="formDiv">
          <h2 className="h2">Add a new Breed!</h2>

          <label className="labels">Name: </label>
          <input
            placeholder="Enter name..."
            type="text"
            value={newDog.name}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="name"
            className={(errors?.name && "warning") || "text"}
          />
          <p className="danger">{errors?.name}</p>

          <label className="labels">Weight in Kg: </label>
          <input
            placeholder="Enter Min weight..."
            type="number"
            value={newDog.weightMin}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="weightMin"
            className={(errors?.weight && "warningMinmax") || "minmax"}
          />
          <input
            placeholder="Enter Max weight..."
            type="number"
            value={newDog.weightMax}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="weightMax"
            className={(errors?.weight && "warningMinmax") || "minmax"}
          />
          <br></br>
          <p className="danger">{errors?.weight}</p>

          <label className="labels">Height in cm: </label>
          <input
            placeholder="Enter Min height..."
            type="number"
            value={newDog.heightMin}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="heightMin"
            className={(errors?.height && "warningMinmax") || "minmax"}
          />
          <input
            placeholder="Enter Max height..."
            type="number"
            value={newDog.heightMax}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="heightMax"
            className={(errors?.height && "warningMinmax") || "minmax"}
          />
          <p className="danger">{errors?.height}</p>

          <label className="labels">Life span: </label>
          <input
            placeholder="Enter estimated years..."
            type="text"
            value={newDog.life}
            onChange={(event) => {
              handleChange(event);
              setErrors(validate(newDog, event.target.name));
            }}
            name="life"
            className={(errors?.life && "warning") || "text"}
          />
          <p className="danger">{errors?.life}</p>
          <label className="labels">image URL: </label>
          <input
            placeholder=" OPTIONAL - Paste here the URL..."
            type="text"
            value={newDog.image}
            onChange={handleChange}
            name="image"
            className={(errors?.image && "warning") || "text"}
          />

          {newDog.image !== "" && (
            <img
              src={newDog.image}
              alt="Image Preview"
              className="imageCreate"
            />
          )}
          <div>
            <label className="labels">Temperament: </label>
            <button
              type="button"
              className="openTemps"
              onClick={() => {
                setShow(true);
                if (!newDog.temperament.length) {
                  save.forEach((target) => {
                    target.className = "eachTemp";
                  });
                  setSave([]);
                }
              }}
            >
              Select
            </button>
            <div>{selectedTemps}</div>
            <p className="danger">{errors?.temperament}</p>
          </div>
          <hr />

          <button type="submit" className="sub">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}
