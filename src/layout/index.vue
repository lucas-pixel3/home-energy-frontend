<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container">
      <div class="logo-container">
        <router-link to="/">
          <h1 class="logo-title">Vue Admin</h1>
        </router-link>
      </div>
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        mode="vertical"
      >
        <el-submenu v-for="(route, index) in routes" :key="index" :index="index.toString()" v-if="route.children && route.children.length > 0">
          <template slot="title">
            <i :class="route.meta && route.meta.icon"></i>
            <span>{{ route.meta && route.meta.title }}</span>
          </template>
          <el-menu-item 
            v-for="(child, i) in route.children" 
            :key="i" 
            :index="index + '-' + i"
            @click="$router.push(child.path)"
          >
            <span>{{ child.meta && child.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
        
        <el-menu-item 
          v-for="(route, index) in singleRoutes" 
          :key="'s-'+index" 
          :index="'s-'+index"
          @click="$router.push(route.path)"
        >
          <i :class="route.meta && route.meta.icon"></i>
          <span slot="title">{{ route.meta && route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <div class="navbar">
        <div class="hamburger" @click="toggleSideBar">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <div class="breadcrumb">
          {{ $route.meta && $route.meta.title }}
        </div>
        <div class="right-menu">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 应用主体内容区域 -->
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    routes() {
      return this.$router.options.routes.filter(route => 
        !route.hidden && route.children && route.children.length > 1
      )
    },
    singleRoutes() {
      return this.$router.options.routes.filter(route => 
        !route.hidden && (!route.children || route.children.length <= 1)
      ).map(route => {
        if (route.children && route.children.length === 1) {
          return {
            path: route.redirect || route.path + '/' + route.children[0].path,
            meta: route.children[0].meta
          }
        }
        return route
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    logout() {
      // 在这里处理登出逻辑
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
}

.sidebar-container {
  width: 210px;
  height: 100%;
  background-color: #304156;
  transition: width 0.28s;
  overflow: hidden;
  
  &.collapse {
    width: 64px;
  }
  
  .logo-container {
    height: 60px;
    line-height: 60px;
    background: #2b2f3a;
    text-align: center;
    
    .logo-title {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 20px;
  
  .hamburger {
    cursor: pointer;
    font-size: 20px;
    margin-right: 20px;
  }
  
  .breadcrumb {
    flex: 1;
  }
  
  .right-menu {
    .el-dropdown-link {
      cursor: pointer;
      color: #333;
    }
  }
}

.app-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>