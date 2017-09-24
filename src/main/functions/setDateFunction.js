import dateFormat from 'dateformat';

export default function setDate(date) {
    if(date!==undefined)
        return dateFormat((new Date(date)),"dd-MM-yyyy hh:mm");
    else
        return "no date";
}