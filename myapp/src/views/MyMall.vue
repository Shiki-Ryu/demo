<template>
  <div class="mall">
  <div class="search">
  <el-input v-model="keyWord" placeholder="型番を入力して検索します"></el-input>
  </div>
    <div class="wrapper"><el-table
    :data="fil_tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="型番">
    </el-table-column>
    <el-table-column
      prop="color"
      label="カラー">
    </el-table-column>
    <el-table-column
      prop="category"
      label="区分">
    </el-table-column>
    <el-table-column
      prop="pirce"
      label="金額">
    </el-table-column>
    <el-table-column
      prop="stock"
      label="在庫">
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyWord: '',
      tableData:[{
        name:'k23185',
        color:'赤',
        category:'セル',
        pirce:'5,500',
        stock:'5'
      },
      {
        name:'k22564',
        color:'黒',
        category:'セル',
        pirce:'5,500',
        stock:'20'
      },
      {
        name:'k39861',
        color:'茶',
        category:'セル',
        pirce:'8,800',
        stock:'17'
      },
      {
        name:'k47562',
        color:'紺',
        category:'メタル',
        pirce:'11,100',
        stock:'7'
      },
      {
        name:'k59671',
        color:'クリア',
        category:'サングラス',
        pirce:'3,300',
        stock:'10'
      },
      {
        name:'k60973',
        color:'シルバー',
        category:'メタル',
        pirce:'8,800',
        stock:'18'
      },
      {
        name:'k74581',
        color:'黒',
        category:'PCメガネ',
        pirce:'5,500',
        stock:'20'
      },
      {
        name:'k83604',
        color:'紫',
        category:'老眼鏡',
        pirce:'4,400',
        stock:'11'
      },
      {
        name:'k56341',
        color:'ゴールド',
        category:'メタル',
        pirce:'11,100',
        stock:'14'
      },
    ],
    fil_tableData:[]

    }
  },
  watch:{
    keyWord:{
      immediate:true,
      handler(val){
      this.fil_tableData=this.tableData.filter((t)=>{
        return t.name.indexOf(val) !== -1
      })
    }
    }
  }
}
</script>

<style lang="less" scoped>
.mall{
  margin: 20px;
}

.wrapper{
  margin: 20px;
}
</style>