import Mock from'mockjs'
export default{
    getMenu: config =>{
        const{username,password} =JSON.parse(config.body)
        if(username === 'admin'  &&  password === 'admin'){
            return{
                code:2000,
                data:{
                    menu:[
                        {
                          path: '/home',
                          name: 'home',
                          label: 'ホーム',
                          icon: 's-home',
                          url: 'Home/Home'
                        },
                        {
                          path: '/mall',
                          name: 'mall',
                          label: '商品管理',
                          icon: 'goods',
                          url: 'MallManage/MallManage'
                        },
                        {
                          path: '/user',
                          name: 'user',
                          label: 'ユーザー管理',
                          icon: 'user',
                          url: 'UserManage/UserManage'
                        },
                        {
                          label:'その他',
                          icon: 'more-outline',
                          children: [
                            {
                              path: '/page1',
                              name: 'page1',
                              label: 'ページ1',
                              icon: 'setting',
                              url: 'Other/PageOne'
                            },
                            {
                              path: '/page2',
                              name: 'page2',
                              label: 'ページ2',
                              icon: 'setting',
                              url: 'Other/PageTwo'
                            }
                          ]
                        }
                      ],
                  token:Mock.Random.guid(),
                  message:'ok'    
                }
            }
        }else{
          return{
            code:-999
          }
        }
    }
}