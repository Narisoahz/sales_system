<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
      <el-col :xl="6" :lg="7">
      <el-form label-position="center" :rules="rules" label-width="80px" :model="loginForm" ref="loginForm">
        <h2>欢迎来到销售管理系统</h2>
        <el-form-item label="账号" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!--      <el-form-item label="验证码" prop="code" style="width: 380px;">-->
        <!--        <el-input v-model="loginForm.code" style="width: 172px; float: left;" maxlength="5"></el-input>-->
        <!--        <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha"></el-image>-->
        <!--      </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
<!--          <el-button type="primary" @click="submitForm1('loginForm')">提交1</el-button>-->
          <!--        <el-button @click="getPass">获取密码</el-button>-->
        </el-form-item>
      </el-form>
        <el-dialog
            title="温馨提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
<!--        <el-alert-->
<!--            title="this"-->
<!--            type="error"-->
<!--            center-->
<!--            show-icon>-->
<!--        </el-alert>-->
    </el-col>
      </div>
    </el-col>
  </el-row>

</template>
<script>
import qs from 'qs'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '1',
        password: '1234'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        // code: [
        //   {required: true, message: '请输入验证码', trigger: 'blur'},
        //   {min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur'}
        // ],
      },
      dialogVisible: false,
      // msg : ''
    }
  },
  methods: {
    handleClose: function () {
      console.log("Handle Close，空函数");
    },
    submitForm(formName) {
      // const self = this;
      this.$refs[formName].validate((valid) => {
        // console.log(this.loginForm.username)
        if (valid) {
          let postData = {
            staffId: this.loginForm.username,
            password: this.loginForm.password
          }
          this.$axios.post('/staff/login', postData).then(res => {
            if (res.data.code == 200) {
              // console.log(res.data.data.level)
              this.$store.commit('SET_STAFF', res.data.data)
              //判断是经理还是领导
              if(res.data.data.level == 2){
                  this.$router.push({
                    path:"/index"
                    // query:{staff: res.data.data}
                  });
                }else{
                  this.$router.push({
                    path:"/index1"
                    // query:{staff: res.data.data}
                  });
                }
                // console.log(res.data);
                // this.msg = res.data.data.msg
            } else {
                console.log(res.data);
                this.$router.push({path:"/login"});
              //   this.msg = res.data.data.msg
                this.$message.error(this.loginForm.username+res.data.msg)
            }
          })
        }else{
            this.dialogVisible = true;
            return false;
        }
      });
    },
    // submitForm1(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$axios.post('/lingdao?' + qs.stringify(this.loginForm)).then(res => {
    //         console.log(res.data)
    //         const jwt = res.headers['authorization']
    //         // 将jwt存储到应用store中
    //         this.$store.commit("SET_TOKEN", jwt)
    //         this.$router.push("/index1")
    //       }).catch(error => {
    //         console.log('error submit!!');
    //       })
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // }
  }
}
</script>
<style scoped>
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
.el-row {
  height: 100%;
  background-color: #fafafa;
}
.el-divider {
  height: 200px;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>