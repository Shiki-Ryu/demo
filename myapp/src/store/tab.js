export default{
    state:{
        isCollapse:false,
        tabList:[
            {
                path: '/home',
                name: 'home',
                label: 'ホーム',
                icon: 's-home',
                url: 'Home/Home'
              },
        ]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            if(val.name!=='home'){
                const index= state.tabList.findIndex(item =>item.name===val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        }
    }
}