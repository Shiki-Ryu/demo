<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" >
          <el-form-item label="名前"  prop="name">
            <el-input v-model="form.name"  type="text" placeholder="名前を入力してください"></el-input>
            </el-form-item>
          <el-form-item label="年齢" prop="age" >
            <el-input v-model="form.age" placeholder="年齢を入力してください"></el-input>
            </el-form-item>
          <el-form-item label="性別" prop="sex">
            <el-select v-model="form.sex" placeholder="性別を選んでください">
              <el-option label="男性" :value=1></el-option>
              <el-option label="女性" :value=0></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生年月日" prop="brith">
              <el-date-picker type="date" placeholder="生年月日を選んでください" v-model="form.birth" value-format="yyyy-MM-DD"   style="width: 100%;">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="メール" prop="mail" type="email">
            <el-input v-model="form.mail" placeholder="メールアドレスを入力してください"></el-input>
          </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">確定</el-button>
      </span>
    </el-dialog>
  <div class="manage-header">
    <el-button type="primary" @click=handleAdd()>+追加</el-button>
  </div>
  <el-table
      height="90%"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名前">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性別">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{scope.row.sex == 1 ? '男': '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年齢">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="生年月日">
      </el-table-column>
      <el-table-column
        prop="mail"
        label="メール">
      </el-table-column>
      <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">編集</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">削除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import{getUser,addUser,editUser,delUser} from'../api'
export default {
name:"MyUser",
data() {
  return {
    dialogVisible: false,
    form:{
      name:'',
      age:'',
      sex:'',
      birth:'',
      mail:''
    },
    rules: {
          name: [
            { required: true, message: '名前を入力してください' }
                ],
           age: [
             { required: true, message: '年齢を入力してください' },
             //{ type: 'number', message: '年龄必须为数字值',trigger: 'change'}
          ],
           sex: [
            { required: true, message: '性別を選んでください' } 
          ],
          birth: [
          { type: 'date',required: true, message: '生年月日を選んでください', trigger: 'change'} 
          ],
           mail: [
          { required: true, message: 'メールアドレスを入力してください' } 
          ]
        },
        tableData:[],
        modalType:0
  }
},
methods: {
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.modalType === 0){
              addUser(this.form).then(() =>{
                this.getList()
              })
            }else{
              editUser(this.form).then(() =>{
                this.getList()
              })
            }
            this.$refs.form.resetFields()
            this.dialogVisible = false
          }
        })
      },
      handleClose(){
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      cancel(){
         this.handleClose()
      },
      handleEdit(row){
        this.modalType=1
        this.dialogVisible = true
        this.form=JSON.parse(JSON.stringify(row))
      },
      handleDelete(row){
        this.$confirm('この内容を完全に消去してもよろしいですか?', 'この操作は取り消しません', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.id}).then( () =>{
              this.$message({
              type: 'success',
              message: '删除しました!'
            });
            
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました！'
          });          
        });
      },
      handleAdd(){
        this.modalType=0
        this.dialogVisible = true
      },
      getList(){
        getUser().then(({data}) =>{
       console.log(data)   
       this.tableData=data.list
    })
      }
  },
  mounted(){
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage{
  height: 90%;
}
</style>