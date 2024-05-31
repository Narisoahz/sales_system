<script setup>

</script>

<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height: 55px;">
        <Strong>销售业务管理系统</Strong>
        <div class="header-avatar block">
<!--          <el-avatar class="el-avatar" size="medium" :src="userInfo.avatar"></el-avatar>-->
          <el-dropdown>
                      <span class="el-dropdown-link">
                        {{staff.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
<!--              <el-dropdown-item :underline="false">-->
<!--                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>-->
<!--              </el-dropdown-item>-->
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-header>
      <el-main>

        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from "./inc/SideMenu";
export default {
  name: "Home",
  components: {
    SideMenu
  },
  data() {
    return {
      staff: {
        staffId: "",
        name: "",
        leaderId: "",
        level: ""
      }
    }
  },
  created() {
    // this.getUserInfo()
    this.staff = this.$store.state.staff
  },
  methods: {
    // getUserInfo() {
    //   this.$axios.get("/common/userInfo").then(res => {
    //     this.userInfo = res.data.data
    //   })
    // },
    logout() {
      this.$axios.get("/staff/logout").then(res => {
        // console.log(res.data.data)
        this.$store.state.staff = {};
        localStorage.clear()
        sessionStorage.clear()
        // this.$store.commit("resetState")
        this.$router.push("/login")
      })
    }
  }
}
</script>
<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>