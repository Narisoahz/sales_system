<template>
<!--  <div>-->
<!--    <h1>近30天内团队统计信息</h1>-->
<!--  </div>-->
  <div>
    <h1>近30天内团队统计信息</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic group-separator=","  :value="statistic.total_record" title="30天内拜访记录总数">
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="30天内拜访的销售机构总数" :value="statistic.total_visit_org">
            <template slot="formatter">
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic group-separator=","  decimal-separator="." :value="statistic.total_visit_channel" title="30天内拜访的销售渠道总数">
          </el-statistic>
        </div>
      </el-col>
    </el-row>
    <h1></h1>
    <h1></h1>
    <h1></h1>
    <div></div>
    <h1></h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic group-separator="," :value="statistic.total_staff" title="团队包含的经理总数">
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="30天内拜访过销售渠道的经理总数" :value="statistic.total_visit_staff">
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic  title="30天内未拜访过销售渠道的经理名称">
            <template slot="suffix" v-model="nameString" >
              {{nameString}}
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statistic:{
      },
      nameString:''
    };
  },
  created() {
    this.getStatistic()
  },
  methods: {
    getStatistic(){
      this.$axios.get('/record/statistic', {
        params:{
          id: this.$store.state.staff.staffId,
          level: this.$store.state.staff.level,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.statistic = res.data.data
          this.nameString = this.statistic.not_visit_staff.map(item =>item.name).join(',')
        } else {

        }
      })
    }

  }

};
</script>
<style lang="scss">
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>