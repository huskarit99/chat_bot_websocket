const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    const existingUser = users.find((user) => user.name === name && user.room === room);
    
    if (!name || !room){
        return {error: 'Username and Room are required'};
    }
    if (existingUser){
        return {error: 'This username was taken'};
    }

    const user = {id, name, room};
    users.push(user);
    console.log('----------------');
    console.log('List of connection: ');
    console.log(users.length);
    for (let i = 0; i < users.length; i++){
        console.log(users[i]);
    }
    console.log('----------------');
    return {user};
}

const removeUser = (ID) => {
    const index = users.findIndex((user) => user.id === ID);
    if(index !== -1) return users.splice(index, 1);
}

const getUser = (ID) => users.find((user) => user.id == ID);

module.exports = { addUser, removeUser, getUser };