//임의의 사용자 데이터
export let users = [
    {
        id:'1',
        nickname:'YEBIN',
        password:'123',
        email:'yebb@gmail.com',
        url:'https://avatars.githubusercontent.com/u/68329482?s=40&v=4'
    },
    {
        id:'2',
        nickname:'choi',
        password:'123',
        email:'choi@gmail.com',
        url:''
    }
]; 
export function findByNickname(nickname) {
    return users.find((user) => user.nickname === nickname);
}

export function createUser(user) {
    const newUser = {...user, id: Date.now().toString()}
    users.push(newUser);
    return newUser.id;
}