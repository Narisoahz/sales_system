<template>
  <div>
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <div v-if="addVisible">
        <el-form-item>
          <el-button type="success" @click="addChannel()">添加销售渠道</el-button>
        </el-form-item>
      </div>
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
  <el-table :data="tableData" :default-sort = "{prop: 'organizationName', order: 'descending'}" style="width: 100%">
    <el-table-column prop="organizationName" sortable label="销售机构名称" width="180">
      <template slot-scope="scope">
<!--        <i class="el-icon-time"></i>-->
        <span style="margin-left: 10px">{{ scope.row.organizationName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="销售渠道名称" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="province" label="省" sortable width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.province }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="city" label="市" sortable width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.city }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="info"
            @click="handleDetail(scope.$index, scope.row)">详细信息</el-button>
        <el-button
            size="mini"
            type = "primary"
            @click="handleWatch(scope.$index, scope.row)">查看该销售渠道的拜访记录</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination @current-change="findPage" :current-page.sync="pageNow" :page-size="size"
                   :pager-count="11" layout="prev, pager, next" :total="total">
    </el-pagination>
    <!-- Form -->
    <el-dialog :visible.sync="dialogFormVisible">
      <div>
      <el-descriptions title="销售渠道详细信息" >
        <el-descriptions-item label="销售机构">
          <el-input v-model="channelDetail.organizationName" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="机构类型">
          <el-input v-model="channelDetail.type" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="销售渠道名称">
          <el-input v-model="channelDetail.name" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="地址">
          <el-input v-model="channelDetail.address" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="联系方式">
          <el-input v-model="channelDetail.contactInfo" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="省份">
          <el-input v-model="channelDetail.province" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="城市">
          <el-input v-model="channelDetail.city" :readonly="readOnly"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="负责人">
          <el-input v-model="nameString" readonly></el-input>
        </el-descriptions-item>
      </el-descriptions>
        <el-form :inline="true"  class="demo-form-inline">
          <div v-if="editVisible">
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" @click="edit()"></el-button>
            </el-form-item>
          </div>
          <div v-if="submitVisible">
            <el-form-item>
              <el-button type="success"  @click="submit()">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisible" title="拜访记录列表" width="65%">
      <div v-if="addRecordVisible">
      <el-button type="success"  @click="addRecord()">添加拜访记录</el-button>
      </div>
        <el-table :data="recordTableData" height="500" border :default-sort = "{prop: 'visitDate', order: 'descending'}" >
        <el-table-column prop="visitDate" sortable label="拜访日期" width="100">
        </el-table-column>
        <el-table-column prop="staffName" label="拜访员工姓名" width="100">
        </el-table-column>
        <el-table-column prop="product" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="interviewee" label="访问对象" width="180">
        </el-table-column>
        <el-table-column prop="notes" label="拜访记录" width="300">
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template  slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit"  @click="editRecord(scope.row)" :disabled="!editRecordVisible || !scope.row.canEditRecord"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteRecord(scope.row)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="修改拜访记录" :visible.sync="dialogEditRecordVisible" width="60%">
      <el-form :model="recordForm"  ref="recordForm" label-width="100px" class="demo-recordForm">
        <el-form-item label="销售机构" prop="orgName">
          <el-input v-model="this.recordOrgName" readonly></el-input>
        </el-form-item>
        <el-form-item label="销售渠道" prop="channelId">
          <el-input v-model="this.recordChannelName" readonly></el-input>
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
      //每页显示的条数
      size: 5,
      //总条数
      total: 0,
      //当前页码
      pageNow: 1,

      searchObj: {
        date: '',
        orgId: '',
        orgList: [],
        channelName: ''
      },
      tableData: [],
      dialogFormVisible: false,
      readOnly: true,
      editVisible: false,
      submitVisible: false,
      addVisible: false,
      channelDetail: {},
      nameString: "",
      beforeChannelDetail: {},
      dialogTableVisible: false,
      recordTableData: [],
      editRecordVisible: false,
      addRecordVisible: false,
      dialogEditRecordVisible: false,
      recordForm:{},
      productList:[],
      recordChannelName: '',
      recordOrgName: ''
    }
  },
  created() {
    this.findPage(),
    this.getOrgList()
    if(this.$store.state.staff.level == 2){
      this.addVisible = true
      this.editRecordVisible = true
      this.addRecordVisible = true
    }
  },
  methods: {
    //当页码发生变化
    findPage() {
      this.findAll(this.pageNow, this.size)
    },
    //查询所有用户信息
    findAll(page, size) {
      //首次进入该页面时会是created调用这个方法，是不会进行传参的
      page = page ? page : this.pageNow;
      size = size ? size : this.size;
      this.$axios.get('/channel/findChannelByPage', {
        params:{
          id: this.$store.state.staff.staffId,
          level: this.$store.state.staff.level,
          pageNow: page,
          pageSize: size
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.channels
          this.total = res.data.data.total
          // console.log(this.tableData)
          // console.log(this.total)
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
    getOrgList(){
      this.$axios.get('/org/findAllOrg', {
      }).then(res => {
        if (res.data.code == 200) {
          this.searchObj.orgList = res.data.data
        } else {

        }
      })
    },
    getChannelList(){
      this.$axios.get('/channel/findChannel', {
        params:{
          id: this.$store.state.staff.staffId,
          level: this.$store.state.staff.level
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        } else {

        }
      })
    },
    handleDetail(index, row) {
      this.dialogFormVisible = true;
      this.editVisible = true;
      this.channelDetail = row
      this.nameString = row.staffs.map(item =>item.name).join(',')
    },
    handleWatch(index, row) {
      this.dialogTableVisible = true;
      this.$axios.get('/record/findRecord',{
        params:{
          id: row.channelId,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.recordTableData = res.data.data
          this.recordChannelName = row.name
          this.recordOrgName = row.organizationName
          //添加判断是否可编辑
          this.canEditRecord()
        } else {

        }
      })

    },
    //判断拜访记录是否可编辑
    canEditRecord(){
        for(let i=0; i<this.recordTableData.length; i++) {
          if(this.recordTableData[i].staffId == this.$store.state.staff.staffId){
            this.recordTableData[i].canEditRecord = true
          }
      }
    },
    edit(){
      console.log(this.channelDetail)
      this.readOnly = false;
      this.editVisible = false;
      this.submitVisible = true;
    },
    submit(){
      this.$axios.post('/channel/editChannel', this.channelDetail).then(res => {
        if (res.data.code == 200) {
          //刷新渠道列表
          // this.getChannelList()
          this.findAll(this.pageNow,this.size)
          this.readOnly = true;
          this.editVisible = true;
          this.submitVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        } else {

        }
      })
    },
    cancel(){
      this.dialogEditRecordVisible = false;
    },
    search(){
      let postData = {
        staffId: this.$store.state.staff.staffId,
        level: this.$store.state.staff.level,
        orgId: this.searchObj.orgId,
        channelName: this.searchObj.channelName
      }
      this.$axios.post('/channel/findChannelBySearchObj', postData).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        } else {
        }
      })
    },
    addChannel(){
      this.$router.push({
        path:"/addChannel"
      });
    },
    addRecord(){
      this.$router.push({
        path:"/addRecord"
      });
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
            if(res.data.msg!=null){
              //没有权限
              this.$message({
                type: 'danger',
                message: '没有权限'
              });
            }else{
              //刷新列表
              this.refreshRecordFrom(row.channelId)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }

          } else{

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editRecord(row){
      this.recordForm = row
      console.log(this.recordForm)
      this.getProductList()
      this.dialogEditRecordVisible = true
    },
    submitForm(formName) {
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
              //刷新列表
              this.refreshRecordFrom(this.recordForm.channelId)
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.dialogEditRecordVisible = false
            } else {
              this.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    refreshRecordFrom(channelId){
      //刷新列表
      this.$axios.get('/record/findRecord',{
        params:{
          id: channelId,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.recordTableData = res.data.data
          //添加判断是否可编辑
          this.canEditRecord()
        } else {
        }
      })
    }
  }
}
</script>

