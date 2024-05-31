<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

    <router-link to="/list">
      <el-menu-item index="findChannelList">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">查看销售渠道列表</span>
        </template>
      </el-menu-item>
    </router-link>
<!--    <router-link to="/addRecord">-->
<!--    <el-menu-item index="addRecord">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-s-custom"></i>-->
<!--        <span slot="title">添加拜访记录</span>-->
<!--      </template>-->
<!--    </el-menu-item>-->
<!--    </router-link>-->
    <router-link to="/watchRecord">
      <el-menu-item index="watchRecord">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">管理自己的拜访记录</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/findPath">
    <el-menu-item index="findPath">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">规划最优拜访路线</span>
      </template>
    </el-menu-item>
    </router-link>
  </el-menu>
</template>
<script>

export default {
name: "SideMenu",
  computed: {

  },
data() {
  return {
      // menuList: this.$store.state.menus.menuList
  }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
a{
  text-decoration:none;
}
</style>