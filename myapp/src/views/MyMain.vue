<template>
<div>
    <el-container>
         <el-aside width="200px">
         <AsideMenu/>
         </el-aside>
         <el-container>
            <el-header>
                <MyHeader/>
            </el-header>
            <el-main> 
                <router-view></router-view>
            </el-main>
         </el-container>
    </el-container>
</div>
</template>

<script>
import AsideMenu from'../components/AsideMenu.vue'
import MyHeader from'../components/MyHeader.vue'
export default {
    name: "MyMain",
    data() {
        return {};
    },
    components: { 
        AsideMenu ,
        MyHeader
    }
}
</script>

<style scoped>
.el-header{
    padding: 0
}
</style>