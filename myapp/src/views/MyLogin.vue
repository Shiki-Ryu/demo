<template>
 <el-form :model="form" ref="form" :rules="rules" class="login-container" >
  <el-form-item label="ID" prop="username">
    <el-input v-model="form.username"  placeholder="ユーザーID"></el-input>
  </el-form-item>
  <el-form-item label="パスワード" prop="password">
    <el-input type="password" v-model="form.password"  placeholder="パスワード"></el-input>
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="submit">ログイン</el-button>
  </el-form-item>
</el-form>
</template>
 
<script>
import Cookie from'js-cookie'
import {getMenu} from'../api' 
export default {
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:{required: true, message: 'IDを入力してください', trigger: 'blur'},
                password:{required: true, message: 'パスワードを入力してください', trigger: 'blur'}
            }
        }
    },
    methods:{
        submit(){
        this.$refs.form.validate((valid) => { 
          if (valid) {
             getMenu(this.form).then(({ data })=>{
                console.log(data)
               if(data.code === 2000) {
                Cookie.set('token',data.data.token)
                this.$router.push('/home')
               }else{
                this.$message.error('認証できません。IDまたはパスワードが正しくありません。')
               }
            }) 
          }
        })
        } 
    }
}
</script>

<style lang="less" scoped> 
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-button{
        display: block;
        margin: 0 auto;
    }
}
</style>