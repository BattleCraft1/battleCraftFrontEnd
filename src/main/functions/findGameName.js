import compareArrays from './compareArrays'

export default (searchCriteria) => {
    let gameName = "";
    if(searchCriteria.length>0){
        console.log(searchCriteria);
        let gameCriteria = searchCriteria.find(criteria => compareArrays(criteria["keys"],["tour", "tournament", "game","name"]));
        gameName = gameCriteria["value"][0];
    }
    return gameName;
}