export default function validate(inputs){
    let errors = {};
    
    if (inputs.name.length < 2) {
        errors = {
            ...errors,
            name: "El nombre debe tener al menos 2 letras" 
        }
    }
    if (!inputs.weightMin.length || !inputs.weightMax.length){
        errors = {
            ...errors,
            weight: "Introduce el peso mínimo y máximo"
        }
    }
    if (!inputs.heightMin.length || !inputs.heightMax.length){
        errors = {
            ...errors,
            height: "Introduce la altura mínima y máxima"
        }
    }
    if (!inputs.life.length){
        errors = {
            ...errors,
            life: "Introduce la esperanza de vida"
        }
    }
    if (!inputs.temperament.length){
        errors = {
            ...errors,
            temperament: "Selecciona al menos un temperamento"
        }
    }
    return errors;
}