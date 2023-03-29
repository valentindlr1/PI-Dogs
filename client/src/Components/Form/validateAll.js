import validate from "./validate";

export default function validateAll (dog) {
    let errors = {}
    
    errors = {
        ...errors,
        ...validate(dog.name, "name"),
        ...validate(dog.weightMin, "weightMin"),
        ...validate(dog.weightMax, "weightMax"),
        ...validate(dog.heightMin, "heightMin"),
        ...validate(dog.heightMax, "heightMax"),
        ...validate(dog.life, "life"),
        ...validate(dog.temperament, "temperament")
    }
    
    return errors
}