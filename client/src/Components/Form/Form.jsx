import "./Form.modules.css";
import validate from "./validate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { editDog } from "../../redux/actions";
import validateAll from "./validateAll";

export default function Form() {
  const onEdit = useSelector((state) => state.onEdit);
  const [newDog, setDog] = useState(
    onEdit.name
      ? onEdit
      : {
          name: "",
          weightMin: "",
          weightMax: "",
          heightMin: "",
          heightMax: "",
          life: "",
          image: "",
          temperament: [],
        }
  );
  const [errors, setErrors] = useState({});
  const [temps, setTemps] = useState([]);
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [save, setSave] = useState([]);

  const dispatch = useDispatch();

  function handleChange(event) {
    setDog({
      ...newDog,
      [event.target.name]: event.target.value,
    });

    setErrors(validate(event.target.value, event.target.name));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(validateAll(newDog))
    try {
      if (
        !newDog.name.length ||
        !newDog.weightMin.length ||
        !newDog.weightMax.length ||
        !newDog.heightMin.length ||
        !newDog.heightMax.length ||
        !newDog.life.length ||
        !newDog.temperament.length ||
        Object.keys(errors).length > 0
      ) {
        setIncomplete(true);
        return;
      }
      setIncomplete(false);

      if (!onEdit.name) {
        await axios
          .get("/dogs")
          .then((res) => res.data)
          .then((dogs) => {
            dogs.forEach((dog) => {
              if (dog.name === newDog.name) {
                setErrors({ ...errors, existingName: true });
                throw new Error("Name already exists");
              }
            });
          });

        await axios.post("/dogs", {
          dog: {
            name: newDog.name,
            weight: newDog.weightMin + " - " + newDog.weightMax,
            height: newDog.heightMin + " - " + newDog.heightMax,
            life_span: newDog.life,
            image: newDog.image,
          },
          temperament: newDog.temperament,
        });
      } else {
        await axios.put("/dogs", {
          name: onEdit.name,
          weight: newDog.weightMin + " - " + newDog.weightMax,
          height: newDog.heightMin + " - " + newDog.heightMax,
          life_span: newDog.life,
          image: newDog.image,
          temperament: newDog.temperament,
        });
      }

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
    } catch (error) {
      console.error(error);
    }
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
      className={
        !onEdit.name
          ? "eachTemp"
          : onEdit.temperament.includes(t)
          ? "markedTemp"
          : "eachTemp"
      }
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
      .get("/temperaments")
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
          <button className="closeTemps" onClick={(event) => {
            setShow(false)
            setErrors(validate(newDog.temperament, "temperament"))
            }}>
            Accept
          </button>
        </div>
      </div>
      <div className={(added && !errors.existingName && "added") || "notAdded"}>
        <div>
          <h2 className="addedText">
            {!onEdit.name
              ? "Breed added successfully!"
              : newDog === onEdit
              ? "No changes were made"
              : "Breed modified successfully!"}
          </h2>
        </div>
        <div>
          <button
            className="closeTemps"
            onClick={() => {
              setAdded(false);
              dispatch(editDog({}));
            }}
          >
            Accept
          </button>
        </div>
      </div>
      <div
        className={
          incomplete || errors.existingName ? "incompleteData" : "completedData"
        }
      >
        <div>
          <h2>
            {errors.existingName
              ? "Name already exists"
              : "Please complete the fields"}
          </h2>
        </div>
        <div>
          <button
            className="closeTemps"
            onClick={() => {
              setIncomplete(false);
              setErrors({ ...errors, existingName: false });
            }}
          >
            Accept
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="formDiv">
          <h2 className="h2">
            {!onEdit.name ? "Add a new Breed!" : "Edit your Dog!"}
          </h2>

          <label className="labels">Name: </label>
          <input
            placeholder="Enter name..."
            type="text"
            value={!onEdit.name ? newDog.name : onEdit.name}
            onChange={(event) => {
              handleChange(event);
              // setErrors(validate(newDog, event.target.name));
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
              // setErrors(validate(newDog, event.target.name));
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
              // setErrors(validate(newDog, event.target.name));
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
              // setErrors(validate(newDog, event.target.name));
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
              // setErrors(validate(newDog, event.target.name));
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
              // setErrors(validate(newDog, event.target.name));
            }}
            name="life"
            className={(errors?.life && "warning") || "text"}
          />
          <p className="danger">{errors?.life}</p>
          <label className="labels">Image URL: </label>
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
            {!onEdit.name ? "CREATE" : "MODIFY"}
          </button>
        </div>
      </form>
    </div>
  );
}
