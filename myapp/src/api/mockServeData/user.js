import Mock from "mockjs"


function param20bj(url){
    const search =url.split('?')[1]
    if(!search){
        return{}
    }
return JSON.parse( 
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g,'\\"')
    .replace(/&/g,'","')
    .replace(/=/g,'":') +
     '"}'
    ) 
}

let list=[]
const count=200

for(let i = 0;i < count; i++){
    list.push(
        Mock.mock({
            id:Mock.Random.guid(),
            name:Mock.Random.name(),
            mail:Mock.Random.email(),
            'age|18-60':1,
            birth:Mock.Random.date(),
            sex:Mock.Random.integer(0,1)
        })
    )
}

export default{
    getUserList:() => {      
    return{
        code:2000,
        list:list
}},
createUser:config =>{
    const {name,mail,age,birth,sex} = JSON.parse(config.body)
    list.unshift({
        id:Mock.Random.guid(),
        name:name,
        mail:mail,
        age:age,
        birth:birth,
        sex:sex
    })
    return{
        code:2000,
        data:{
            message:'追加しました。'
        }
    }
},
deleteUser:config =>{
    const {id} =JSON.parse(config.body)
    if(!id){
        return{
            code:-999,
            message:'内容をもう一度ご確認ください。'
        }
        }else{
            list=list.filter(u => u.id !== id)
            return{
                code:2000,
                message:'削除しました。'
            }
        }
    },
    bathchremove:config =>{
        let {ids} = param20bj(config.url)
        ids=ids.split(',')
        list= list.filter(u => !ids.includes(u.id))
        return{
            code:2000,
            data:{
                messge:'まとめて削除しました。'
            }
        }
    },
    updateUser:config =>{
        const {id,name,mail,age,birth,sex} = JSON.parse(config.body)
        const sex_num =parseInt(sex)
        list.some(u => {
            if(u.id ===id){
                u.name = name,
                u.mail = mail,
                u.age = age,
                u.birth = birth,
                u.sex = sex_num
                return true
            }
        })
        return{
            code:2000,
            data:{
                message:'編集しました。'
            }
        }
    }
}

  