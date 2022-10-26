<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <h3>{{isCollapse ? '' : 'ネットショップ管理システム'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren"  :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
name:"AsideMenu",
data() {
    return {
        MenuData:[
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
      ]
    }
},
methods:{
  clickMenu(item){
    if(this.$route.path !== item.path && !(this.$route.path ==='/home' && (item.path==='/') )) {
      this.$router.push(item.path)
    }
    this.$store.commit('selectMenu',item)
  }
},
computed:{
  noChildren(){
    return this.MenuData.filter(item => !item.children)
  },
  hasChildren(){
    return this.MenuData.filter(item => item.children)
    },
  isCollapse(){
    return this.$store.state.tab.isCollapse
  }
  }
}

</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border-right: none;
  position: sticky;
  top:0px;
  h3{
    color:#fff;
    text-align: center;
    line-height: 48px;
    font-size: 15px;
    font-weight: 400;
  }
}
</style>