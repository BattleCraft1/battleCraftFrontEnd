import dateFormat from 'dateformat';

export default function setDate(date) {
    if(date!==undefined)
        return dateFormat((new Date(date)),"yyyy-MM-dd'T'hh:mm");
    else
        return "no date";
}