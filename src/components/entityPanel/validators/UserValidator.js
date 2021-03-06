import setDateFunction from "../../../main/functions/setDateFunction";
import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";
import validateAddress from './AddressValidator'
import getDatesDifferenceInDays from "../../../main/functions/getDatesDifferenceInDays";

export default (entity) => {
    let validationErrors = {};
    let fieldErrors = {};

    if(!entity.nameChange.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻa-zzżźćńółęąś0-9]{3,30}$")))
        fieldErrors.nameChange = "Name must have between 3 to 30 chars";

    if(!entity.firstname.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻ][a-zzżźćńółęąś]{2,19}$")))
        fieldErrors.firstname = "First name must start with big letter and have between 3 to 30 chars";

    if(!entity.lastname.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻ][a-zzżźćńółęąś]{2,19}$")))
        fieldErrors.lastname = "Last name must start with big letter and have between 3 to 30 chars";

    if(entity.phoneNumber!=="" && !entity.phoneNumber.match(new RegExp("^[0-9]{9,11}$")))
        fieldErrors.phoneNumber = "Invalid phone number";

    if(!entity.email.match(new RegExp("(^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.+[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@+(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)")))
        fieldErrors.email = "Invalid email";

    validateAddress(entity,fieldErrors);

    if((new Set(entity.participatedTournaments)).size !== entity.participatedTournaments.length)
        fieldErrors.participatedTournaments = "You cannot have duplicated tournament";

    if((new Set(entity.organizedTournaments)).size !== entity.organizedTournaments.length)
        fieldErrors.organizedTournaments = "You cannot have duplicated tournament";

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid user data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}