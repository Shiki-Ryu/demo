<template>
  <el-row>
  <el-col :span="8" style="padding-right:10px">
    <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/admin.jpg" alt="">
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="access">アドミニストレータ</p>
            </div>
         </div>
          <div class="login-info">
            <p>前回ログイン日時：<span> 2022-10-14 22:48</span></p>
            <p>前回ログイン場所：<span> 東京</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height: 460px;">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              fixed
              prop="name"
              label="商品"
              min-width="120px">
            </el-table-column>
            <el-table-column
              prop="todayBuy"
              label="本日売上">
            </el-table-column>
            <el-table-column
              prop="monthBuy"
              label="月間売上">
            </el-table-column>
            <el-table-column
              prop="totalBuy"
              label="総売上"
              min-width="100">
            </el-table-column>
          </el-table>
        </el-card>
    </div>
  </el-col>
    <el-col :span="16" style="padding-left:10px"> 
      <div class="num">
        <el-card  v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:'0'}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="number">{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <div ref="echarts1" style="height:280px"></div>
      </el-card>
      <div class="graph">
       <el-card>
        <div ref="echarts2" style="height:260px"></div>
       </el-card> 
       <el-card>
        <div ref="echarts3" style="height:240px"></div>
       </el-card> 
      </div>
    </el-col>
</el-row>
</template> 

<script>
import{getData}from'../api'
import * as echarts from 'echarts'
export default {
  name:"MyHome",
  data() {
    return {
      tableData:[],
      countData:[
        {
          name:'本日の受注件数',
          value:'46',
          icon:'success',
          color:'#67C23A'
        },
        {
          name:'本日のキャンセル',
          value:'1',
          icon:'error',
          color:'#F56C6C'
        },
        {
          name:'本日のリピーター',
          value:'6',
          icon:'star-on',
          color:'#E6A23C'
        },
        {
          name:'今月の受注件数',
          value:'1557',
          icon:'success',
          color:'#67C23A'
        },{
          name:'今月のキャンセル',
          value:'9',
          icon:'error',
          color:'#F56C6C'
        },
        {
          name:'今月のリピーター',
          value:'165',
          icon:'star-on',
          color:'#E6A23C'
        },
      ]
  }
},
mounted() {
  getData().then(({data}) =>{
    const{tableData,userData,videoData}=data.data
    this.tableData=tableData

    const echarts1 = echarts.init(this.$refs.echarts1)
    var echarts1Option={}
    const{orderData} = data.data
    const xAxis =Object.keys(orderData.data[0])
    echarts1Option.xAxis={
      data:xAxis
    }
    echarts1Option.yAxis={
      
    }
    echarts1Option.legend={
      data:xAxis
    }
    echarts1Option.series=[]
    xAxis.forEach(key =>{
      echarts1Option.series.push({
        name:key,
        data:orderData.data.map(item =>item[key]),
        type:'line'
      })
    })
    echarts1.setOption(echarts1Option)

  const echarts2 = echarts.init(this.$refs.echarts2) 
  const echarts2Opiton={
      length:{
      textStyle:{
        color:"#333",
      }
    },
      grid:{
        left:"20%"
      },
      tooltip:{
        trigger:"axis"
      },
      xAxis:{
        type:"category",
        data:userData.map(item => item.date),
        axisline:{
          lineStyle:{
            color:"#17b3a3"
          }
        },
        axisLabel:{
          interval:0,
          color:"#333"
        }
      },
      yAxis:[
        {
          type:"value",
          axisline:{
          lineStyle:{
            color:"#17b3a3"
              }
           }
        }
      ],
      color:["#2ec7c9","#b6a2de"],
      series:[
        {
          name:'新規',
          data: userData.map(item => item.new),
          type:'bar'
        },
        {
          name:"リピーター",
          data:userData.map(item => item.active),
          type:'bar'
       }
      ],
    }
    echarts2.setOption(echarts2Opiton)

    const echarts3 = echarts.init(this.$refs.echarts3) 
    const echarts3Opiton={
      tooltip:{
        trigger:"item"
      },
      color:[
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf"
      ],
      series:[
        {
          data:videoData,
          type:'pie'
        }
      ]
    }
    echarts3.setOption(echarts3Opiton)
  })
  }
}

</script>

<style lang="less" scoped>
.user{
  display: flex;
  align-content: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info{
    .name{
      font-size:32px;
      margin-bottom: 10px;
    }
    .access{
      color: #99999999;
    }
  }
}
.login-info{
  p{
      line-height: 28px;
      font-size: 14px;
      color: #99999999;
      span{
        color: #666666;
        margin-left: 60px;
      }
    }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .number{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #99999999;
      text-align: center;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card{
    height:260px;
    width: 48%;
  }
}
</style>