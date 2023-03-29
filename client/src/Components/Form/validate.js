export default function validate(evValue, evName) {
  let errors = {};

  if (evName === "name" && evValue.length < 2) {
    errors = {
      ...errors,
      name: "Name must have at least two characters length",
    };
  }
  if (
    (evName === "weightMax") &&
    (!evValue.length)
  ) {
    errors = {
      ...errors,
      weight: "Set both min and max weight",
    };
  }
  if (
    (evName === "weightMin") &&
    (!evValue.length)
    ) {
      errors = {
        ...errors,
        weight: "Set both min and max weight",
      };
    }
    if (
      (evName === "weightMax") &&
      (Number(evValue) <=2)
    ) {
      errors = {
        ...errors,
        weight: "Weights must be bigger than 2 Kg",
      };
    }
    if (
    (evName === "weightMin") &&
    (Number(evValue) <=2)
  ) {
    errors = {
      ...errors,
      weight: "Weights must be bigger than 2 Kg",
    };
  }
  if (
    (evName === "heightMin") &&
    (!evValue.length)
  ) {
    errors = {
      ...errors,
      height: "Set both min and max height",
    };
  }
  if (
    (evName === "heightMax") &&
    (!evValue.length)
  ) {
    errors = {
      ...errors,
      height: "Set both min and max height",
    };
  }
  if (
    (evName === "heightMax") &&
    (Number(evValue) < 10)
  ) {
    errors = {
      ...errors,
      height: "Height must be at least 10 cm",
    };
  }
  if (
    (evName === "heightMin") &&
    (Number(evValue) < 10)
  ) {
    errors = {
      ...errors,
      height: "Height must be at least 10 cm",
    };
  }
  if (evName === "life" && evValue.length === 0) {
    errors = {
      ...errors,
      life: "Set a life span",
    };
  }
  if (evName === "temperament" && !evValue.length) {
    errors = {
      ...errors,
      temperament: "Select at least one temperament",
    };
  }
  
  return errors;
}
