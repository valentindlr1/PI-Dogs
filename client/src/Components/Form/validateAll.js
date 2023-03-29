import validate from "./validate";

export default function validateAll (dog) {
    let errors = {}
    errors = {
        ...errors,
        ...validate("name", dog.name),
        ...validate("weightMin", dog.weightMin),
        ...validate("weightMax", dog.weightMax),
        ...validate("heightMin", dog.heightMax),
        ...validate("heightMax", dog.heightMax),
        ...validate("life", dog.life),
        ...validate("temperament", dog.temperament)
    }
    return errors
}