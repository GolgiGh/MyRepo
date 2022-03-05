const {DateTime} = require("luxon");
const { uuid} = require('uuidv4');

const connections = [
    {
        id: '1',
        topic: 'ITIS 3246',
        title: 'Working with linux',
        host: 'GOLGIM',
        details: 'I am new to linux and Would like to connect  with others to explore the IDE and learn the ins and outs',
        where: 'Fretwell room 107',
        when: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        start: '11:30 pm',
        end: '1:00pm',
        image_url: 'https://1000logos.net/wp-content/uploads/2017/03/Symbol-Linux.jpg'
        
    },

    {
        id: '2',
        topic: 'ITIS 3135',
        title: 'Creating website',
        host: 'GOLGIM',
        details: 'I want to learn how to use visual studio code to develop a website',
        where: 'Woodward room 105',
        when: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        start: '11:00 am',
        end: '1:00pm',
        image_url: 'https://i.ytimg.com/vi/fJEbVCrEMSE/maxresdefault.jpg'
    }

    
];

exports.find = () => connections;

exports.findById = id => connections.find(connection => connection.id === id);

exports.save = connection => { 
    connection.id = uuid();
    connection.date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);

}

exports.updateById = (id, newConnection)=> {
    let connection = connections.find(connection => connection.id === id);
    if(connection){
        connection.topic = newConnection.topic;
        connection.title = newConnection.title;
        connection.host = newConnection.host;
        connection.details = newConnection.details;
        connection.where = newConnection.where;
        connection.when = newConnection.when;
        connection.start = newConnection.start;
        connection.end = newConnection.end;
        connection.image_url = newConnection.image_url;
        return true;
    }else 
    return false;
    
}

exports.deleteById = id => {
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1){
        connections.splice(index, 1);
        return true;
    }else {
    return false;   
    }
}