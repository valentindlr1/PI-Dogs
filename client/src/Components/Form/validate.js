export default function validate(inputs){
    let errors = {};
    
    if (inputs.name.length < 2) {
        errors = {
            ...errors,
            name: "El nombre debe tener al menos 2 letras" 
        }
    }
    return errors;
}