import { v4 as uuidv4 } from 'uuid';

const idhandler = () =>{
    const userId = uuidv4();

    let matches = userId.match(/\d+/g);
    let iD = 0;
    matches.forEach((el) => iD += parseInt(el));

    let newID = '10'.concat(iD);

    return newID;
}
idhandler()
export default idhandler;