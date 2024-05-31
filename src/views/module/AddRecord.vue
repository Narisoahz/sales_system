<template>
  <el-form :model="recordForm" :rules="rules" ref="recordForm" label-width="100px" class="demo-recordForm">
    <el-form-item label="销售机构" prop="orgId">
      <el-select v-model="recordForm.orgId" placeholder="请选择销售机构"
       @change="findChannelList(recordForm.orgId)">
        <el-option
            v-for="curOrg in recordForm.orgList"
            :key="curOrg.organizationId"
            :label="curOrg.name"
            :value="curOrg.organizationId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="销售渠道" prop="channelId">
      <el-select v-model="recordForm.channelId" placeholder="请选择销售渠道">
        <el-option
            v-for="curChannel in recordForm.channelList"
            :key="curChannel.channelId"
            :label="curChannel.name"
            :value="curChannel.channelId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="拜访时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="recordForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="推销产品名称" prop="productName" >
      <el-select v-model="recordForm.productName" placeholder="请选择产品">
        <el-option
            v-for="curproduct in productList"
            :key="curproduct.name"
            :label="curproduct.name"
            :value="curproduct.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="访问对象" prop="interviewee">
      <el-input v-model="recordForm.interviewee"></el-input>
    </el-form-item>
    <el-form-item label="拜访记录" prop="desc">
      <el-input type="textarea" v-model="recordForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('recordForm')">立即创建</el-button>
      <el-button @click="resetForm('recordForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      recordForm: {
        orgId: '',
        orgList: [],
        channelId: '',
        channelList: [],
        date1: '',
        productName :'',
        interviewee: '',
        desc: ''
      },
      productList:[],
      rules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        interviewee: [
          { required: true, message: '请输入访问对象', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择销售机构', trigger: 'change' }
        ],
        channelId: [
          { required: true, message: '请选择销售渠道', trigger: 'change' }
        ],
        date1: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写拜访纪要', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getOrgList()
    this.getProductList()
  },
  methods: {
    getOrgList(){
      this.$axios.get('/org/findOrg', {
        params:{
          id: this.$store.state.staff.staffId,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.recordForm.orgList = res.data.data
        } else {

        }
      })
    },
    getProductList(){
      this.productList = [
        {
          name : '易方达消费精选股票'
        },
        {
          name : '易方达均衡成长股票'
        },
        {
          name : '易方达医药生物股票A'
        },
        {
          name : '易方达信息行业精选股票C'
        }
      ]
    },
    findChannelList(orgId){
      // console.log(this.recordForm.orgId)
      this.$axios.get('/channel/findChannel1', {
        params:{
          staffId: this.$store.state.staff.staffId,
          orgId: orgId
        }
      }).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.recordForm.channelList = res.data.data
          this.recordForm.channelId = ''
        } else {

        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData ={
            staffId: this.$store.state.staff.staffId,
            organizationId: this.recordForm.orgId,
            channelId: this.recordForm.channelId,
            product: this.recordForm.productName,
            interviewee: this.recordForm.interviewee,
            visitDate: this.recordForm.date1,
            notes: this.recordForm.desc,
          }
          this.$axios.post('/record/addRecord', postData).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.$refs[formName].resetFields();
              this.$router.push({
                path:"/watchRecord"
              });
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>

</style>