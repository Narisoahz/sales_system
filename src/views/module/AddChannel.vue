<template>
  <el-form :model="channelForm" :rules="rules" ref="channelForm" label-width="100px" class="demo-channelForm">
    <el-form-item label="销售机构" prop="orgId">
      <el-select v-model="channelForm.orgId" placeholder="请选择销售机构">
        <el-option
            v-for="curOrg in channelForm.orgList"
            :key="curOrg.organizationId"
            :label="curOrg.name"
            :value="curOrg.organizationId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="销售渠道名称" prop="name">
      <el-input v-model="channelForm.name"></el-input>
    </el-form-item>
    <el-form-item label="所在省" prop="province" >
      <el-select v-model="channelForm.province" placeholder="请选择省" @change="findCityList(channelForm.province)">
        <el-option
            v-for="curprovince in provinceList"
            :key="curprovince.name"
            :label="curprovince.name"
            :value="curprovince.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在市" prop="city" >
      <el-select v-model="channelForm.city" placeholder="请选择市">
        <el-option
            v-for="curcity in cityList"
            :key="curcity.name"
            :label="curcity.name"
            :value="curcity.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="channelForm.address"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contactInfo">
      <el-input v-model="channelForm.contactInfo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('channelForm')">立即创建</el-button>
      <el-button @click="resetForm('channelForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      channelForm: {
        orgId: '',
        orgList: [],
        name :'',
        province: '',
        city: '',
        address: '',
        contactInfo: ''
      },
      provinceList: [],
      cityList:[],
      rules: {
        name: [
          { required: true, message: '请输入销售渠道名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择销售机构', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择所在省', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择所在市', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        contactInfo: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getOrgList()
    this.getProvinceList()
  },
  methods: {
    getProvinceList(){
      this.provinceList = [
        {
          name : '广东省'
        },
        {
          name : '广西省'
        },
        {
          name : '浙江省'
        },
        {
          name : '四川省'
        }
      ]
    },
    getOrgList(){
      this.$axios.get('/org/findAllOrg').then(res => {
        if (res.data.code == 200) {
          this.channelForm.orgList = res.data.data
        } else {

        }
      })
    },
    findCityList(province){
      if(province=="广东省"){
        this.cityList = [
          {
            name : '深圳市'
          },
          {
            name : '珠海市'
          },
          {
            name : '广州市'
          }
        ]
      }else if(province=="广西省"){
        this.cityList = [
          {
            name : '南宁市'
          },
          {
            name : '柳州市'
          },
          {
            name : '玉林市'
          }
        ]
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData ={
            organizationId: this.channelForm.orgId,
            name: this.channelForm.name,
            province: this.channelForm.province,
            city: this.channelForm.city,
            address: this.channelForm.address,
            contactInfo: this.channelForm.contactInfo,
          }
          let queryParams = {
             staffId: this.$store.state.staff.staffId
          }
          this.$axios.post('/channel/addChannel', postData, {
            params: queryParams
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.$refs[formName].resetFields();
              this.$router.push({
                path:"/list"
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