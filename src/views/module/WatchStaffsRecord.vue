<template>
  <div>
  <el-table :data="staffsTableData" :default-sort = "{prop: 'name', order: 'descending'}" >
    <el-table-column prop="name" sortable label="经理名称" width="120">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="120">
    </el-table-column>
    <el-table-column prop="phone" label="联系电话" width="120">
    </el-table-column>
    <el-table-column label="操作" width="170">
      <template slot-scope="scope">
        <el-button type="primary" @click="watchRecords(scope.row)" size="medium">查看其拜访记录</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog :visible.sync="dialogTableVisible" width="70%">
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
      </el-form>
      <el-table :data="recordTableData" :default-sort="{prop: 'visitDate', order: 'descending'}" border >
        <el-table-column prop="visitDate" sortable label="拜访日期" width="130">
        </el-table-column>
        <el-table-column prop="orgName" sortable label="销售机构名称" width="130">
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
        <el-table-column label="操作" width="120">
          <template  slot-scope="scope">
            <el-button type="danger" size="primary" icon="el-icon-delete" @click="deleteRecord(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>
<script>

export default {
  data() {
    return {
      staffsTableData: [],
      dialogTableVisible: false,
      recordTableData:[],
      searchObj: {
        date: '',
        orgId: '',
        orgList: [],
        channelName: '',
        staffId: ''
      }
    }
  },
  created() {
    this.getStaffsList()
  },
  methods: {
    getStaffsList(){
      this.$axios.get('/staff/staffList', {
        params:{
          id: this.$store.state.staff.staffId,
          level: this.$store.state.staff.level
        }
      }).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.staffsTableData = res.data.data
        } else {

        }
      })
    },
    watchRecords(row){
      this.$axios.get('/record/findRecord1', {
        params:{
          id: row.staffId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.recordTableData = res.data.data
          this.searchObj.staffId = row.staffId
          this.dialogTableVisible = true;
          this.getOrgList()
        } else {

        }
      })
    },
    search(){
      let postData = {
        staffId: this.searchObj.staffId,
        date: this.searchObj.date,
        orgId: this.searchObj.orgId,
        channelName: this.searchObj.channelName
      }
      this.$axios.post('/record/findRecordBySearchObj', postData).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.recordTableData = res.data.data

        } else {
        }
      })
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
    deleteRecord(row){
      // console.log(row)
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
            if(res.data.msg!=null){
              //没有权限
              this.$message({
                type: 'danger',
                message: '没有权限'
              });
            }else{
              //刷新列表
              this.watchRecords(row)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }else{

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>