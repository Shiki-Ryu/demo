<template>
  <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right:20px" @click=" handleMenu()" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img src="../assets/admin.jpg" alt="" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>マイページ</el-dropdown-item>
                    <el-dropdown-item command="logout" >ログアウト</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>  
        </div>
  </div>
</template>

<script>
import{mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
data() {
    return {
        
    }
},
methods:{
    handleMenu(){
        this.$store.commit('collapseMenu')
    },
    handleCommand(command){
        if(command === 'logout'){
         Cookie.remove('token')  
        this.$router.push('/login')
        }
    } 
}, 
computed:{
    ...mapState({
        tags:state => state.tab.tabList
    })
}, 
mounted(){
    console.log(this.tags,'tags')
}
}
</script>

<style lang="less" scoped>
.header-container{
    background-color: #333;
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text{
        color:#fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;

        }
    }
    .l-content{
        display: flex;
        align-items: center;
            /deep/.el-breadcrumb__item{
                .el-breadcrumb__inner{
                    font-weight: normal;
                    color: #666;
                    }
                   &:last-child{
                    .el-breadcrumb__inner{
                         color: #fff;
                    }
                   } 
                }
             }
        } 
</style>