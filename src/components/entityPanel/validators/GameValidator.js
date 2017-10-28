import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";

export default (entity) => {
    let validationErrors = {};
    let fieldErrors = {};

    if(entity.name.length<1 || entity.name.length>50)
        fieldErrors.nameChange = "Game name must have between 1 to 50 chars";

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid game data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}