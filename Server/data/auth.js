// password : abcd1234 -> $2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO
let users = [{
    id: '1',
    username: 'melon', 
    password:'$2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO',
    name:'이메론',
    email:'melon@melon.com',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
    }
];

export async function findByUsername(username){
    return users.find((user) => user.username === username)
}

export async function createUser(user){
    const created = {...user, id:Date.now().toString()}  // 전달받은객체를 복사하고 id는 현재시간으로 바꿔줌
    users.push(created)
    return created.id
}
export async function findById(id){
    return users.find((user)=> user.id === id);
}