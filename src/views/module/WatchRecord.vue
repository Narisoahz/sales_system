<template>
  <div>
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <el-form-item label="拜访日期">
      <el-date-picker value-format="yyyy-MM-dd" v-model="searchObj.date" type="date" placeholder="选择日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="销售机构" prop="orgId">
        <el-select v-model="searchObj.orgId" placeholder="销售机构名称">
          <el-option label="全部" value="0"></el-option>
          <el-option
              v-for="curOrg in searchObj.orgList"
              :key="curOrg.organizationId"
              :label="curOrg.name"
              :value="curOrg.organizationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售渠道名称">
        <el-input v-model="searchObj.channelName" placeholder="销售渠道名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addRecord()">添加</el-button>
      </el-form-item>
    </el-form>
  <el-table :data="recordTableData" :default-sort = "{prop: 'visitDate', order: 'descending'}" border style="width: 75%">
    <el-table-column prop="visitDate" sortable label="拜访日期" width="150">
    </el-table-column>
    <el-table-column prop="orgName" sortable label="销售机构名称" width="120">
    </el-table-column>
    <el-table-column prop="channelName" label="销售渠道名称" width="120">
    </el-table-column>
    <el-table-column prop="province" sortable label="省份" width="120">
    </el-table-column>
    <el-table-column prop="city" sortable label="市区" width="120">
    </el-table-column>
    <el-table-column prop="staffName" label="拜访员工姓名" width="120">
    </el-table-column>
    <el-table-column prop="product" label="产品名称" width="120">
    </el-table-column>
    <el-table-column prop="interviewee" label="访问对象" width="120">
    </el-table-column>
    <el-table-column prop="notes" label="拜访记录" width="120">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template  slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="editRecord(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteRecord(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog :visible.sync="dialogTableVisible" width="60%">
      <el-form :model="recordForm"  ref="recordForm" label-width="100px" class="demo-recordForm">
        <el-form-item label="销售机构" prop="organizationId">
          <el-select v-model="recordForm.organizationId"  placeholder="请选择销售机构"
                     @change="findChannelList(recordForm.organizationId, recordForm.staffId), resetChannel()" >
            <el-option
                v-for="curOrg in orgListnew"
                :key="curOrg.organizationId"
                :label="curOrg.name"
                :value="curOrg.organizationId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售渠道" prop="channelId">
          <el-select v-model="recordForm.channelId" placeholder="请选择销售渠道">
            <el-option
                v-for="curChannel in channelList"
                :key="curChannel.channelId"
                :label="curChannel.name"
                :value="curChannel.channelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拜访时间" required>
          <el-col :span="11">
            <el-form-item prop="visitDate">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="recordForm.visitDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="推销产品名称" prop="product" >
          <el-select v-model="recordForm.product" placeholder="请选择产品">
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
          <el-input type="textarea" v-model="recordForm.notes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('recordForm')">修改</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      recordTableData: [],
      searchObj: {
        date: '',
        orgId: '',
        orgList: [],
        channelName: ''
      },
      recordForm:{

      },
      dialogTableVisible: false,
      productList:[],
      orgListnew: [],
      channelList: []
    }
  },
  created() {
    this.getRecordList()
    this.getOrgList()
  },
  methods: {
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
    getOrgList(){
      this.$axios.get('/org/findAllOrg', {
      }).then(res => {
        if (res.data.code == 200) {
          this.searchObj.orgList = res.data.data
        } else {

        }
      })
    },
    getRecordList(){
      this.$axios.get('/record/findRecord1', {
        params:{
          id: this.$store.state.staff.staffId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.recordTableData = res.data.data
        } else {

        }
      })
    },
    addRecord(){
      this.$router.push({
        path:"/addRecord"
      });
    },
    search(){
      let postData = {
        staffId: this.$store.state.staff.staffId,
        date: this.searchObj.date,
        orgId: this.searchObj.orgId,
        channelName: this.searchObj.channelName
      }
      this.$axios.post('/record/findRecordBySearchObj', postData).then(res => {
        if (res.data.code == 200) {
          this.recordTableData = res.data.data
        } else {
        }
      })
    },
    editRecord(row){
      this.recordForm = row
      this.getEditOrgList(row.staffId)
      this.findChannelList(row.organizationId, row.staffId)
      this.getProductList()
      this.dialogTableVisible = true
    },
    deleteRecord(row){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //发送后端删除操作
        this.$axios.delete('/record/deleteRecord', {
          params:{
            id: this.$store.state.staff.staffId,
            level: this.$store.state.staff.level,
            visit_id: row.visitId
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.getRecordList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else if(res.data.code == 201){
            //没有权限
            this.$message({
              type: 'danger',
              message: '没有权限'
            });
          }else{

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getEditOrgList(staffId){
      this.$axios.get('/org/findOrg', {
        params:{
          id: staffId,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.orgListnew = res.data.data
          // console.log(this.orgListnew)
        } else {

        }
      })
    },
    findChannelList(orgId, staffId){
      this.$axios.get('/channel/findChannel1', {
        params:{
          staffId: staffId,
          orgId: orgId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.channelList = res.data.data
          console.log(this.channelList)
        } else {

        }
      })
    },
    resetChannel(){
      this.recordForm.channelId = ''
    },
    submitForm(formName) {
      // console.log(this.recordForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData ={
            visitId: this.recordForm.visitId,
            staffId: this.recordForm.staffId,
            organizationId: this.recordForm.organizationId,
            channelId: this.recordForm.channelId,
            product: this.recordForm.product,
            interviewee: this.recordForm.interviewee,
            visitDate: this.recordForm.visitDate,
            notes: this.recordForm.notes,
          }
          this.$axios.post('/record/editRecord', postData).then(res => {
            if (res.data.code == 200) {
              this.getRecordList()
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.dialogTableVisible = false
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
    cancel() {
      this.dialogTableVisible=false;
    }

  }
}
</script>