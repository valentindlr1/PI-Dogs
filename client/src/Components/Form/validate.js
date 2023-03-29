export default function validate(evValue, evName) {
  let errors = {};

  if (evName === "name" && evValue.length < 2) {
    errors = {
      ...errors,
      name: "Name must have at least two characters length",
    };
  }
  if (
    (evName === "weightMin" || evName === "weightMax") &&
    (!evValue.length || !evValue.length)
  ) {
    errors = {
      ...errors,
      weight: "Set both min and max weight",
    };
  }
  if (
    (evName === "heightMin" || evName === "heightMax") &&
    (!evValue.length || !evValue.length)
  ) {
    errors = {
      ...errors,
      height: "Set both min and max height",
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
