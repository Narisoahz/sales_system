<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <router-link to="/list1">
      <el-menu-item index="findChannelList">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">查看销售渠道列表</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/watchStaffsRecord">
      <el-menu-item index="watchStaffsRecord">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">查看经理的拜访记录</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/statistic">
      <el-menu-item index="statistic">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">查看团队的拜访统计信息</span>
        </template>
      </el-menu-item>
    </router-link>
    <router-link to="/rank">
      <el-menu-item index="rank">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">查看销售经理之间的排名</span>
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
  return{}
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