export default function validate(inputs, evName) {
  let errors = {};

  if (evName === "name" && inputs.name.length < 2) {
    errors = {
      ...errors,
      name: "Name must have at least two characters length",
    };
  }
  if (
    (evName === "weightMin" || evName === "weightMax") &&
    (!inputs.weightMin.length || !inputs.weightMax.length)
  ) {
    errors = {
      ...errors,
      weight: "Set both min and max weight",
    };
  }
  if (
    (evName === "heightMin" || evName === "heightMax") &&
    (!inputs.heightMin.length || !inputs.heightMax.length)
  ) {
    errors = {
      ...errors,
      height: "Set both min and max height",
    };
  }
  if (evName === "life" && inputs.life.length === 0) {
    errors = {
      ...errors,
      life: "Set a life span",
    };
  }
  if (evName === "temperament" && !inputs.temperament.length) {
    errors = {
      ...errors,
      temperament: "Select at least one temperament",
    };
  }
  return errors;
}
