import Vue from 'vue'
import VueRouter from 'vue-router'
import MyMain from'../views/MyMain.vue'
import MyHome from'../views/MyHome.vue'
import MyUser from'../views/MyUser.vue'
import MyMall from'../views/MyMall.vue'
import PageOne from'../views/PageOne.vue'
import PageTwo from'../views/PageTwo.vue'
import MyLogin from'../views/MyLogin.vue'
Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: MyMain,
        redirect:'/home',
        children:[
        { path:'home', component: MyHome},
        { path:'user', component: MyUser},
        { path:'mall',component:MyMall},
        { path:'page1',component:PageOne},
        { path:'page2',component:PageTwo}
        ]
     },
   {
    path:'/login',
    name:'login',
    component:MyLogin
   }
  ]
  const router = new VueRouter({
    routes 
  })  
export default router
