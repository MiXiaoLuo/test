
<template>
  <nav class="navbar navbar-default mynav">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" @click="slide">
          <span class="sr-only">{{flag}}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/home">自做论坛</router-link>
      </div>
      <transition name="slide-nav">
        <div class="navbar-collapse" v-if="flag" @click="hideNavBar">
          <div @click.stop>
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">预留导航</a></li>
              <li><a href="#">预留导航</a></li>
            </ul>
            <div class="navbar-form navbar-right">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="查询文章">
              </div>
              <button type="submit" class="btn btn-default">搜索</button>
            </div>
            <ul class="nav navbar-nav navbar-right" v-if="userInfo.isLogin">
              <li><router-link to="/mycenter">欢迎您： <img :src="baseURL + userInfo.headPicture" class="headerPic" alt=""> {{userInfo.nickName}}</router-link></li>
              <li><a @click="quit">退出</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-else>
              <li><router-link to="/register">注册</router-link></li>
              <li><router-link to="/login">登录</router-link></li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
  import {mapState} from 'vuex';
export default {
  name: 'Header',
  data () {
    return {
      flag: true
    }
  },
  computed: {
    ...mapState(['userInfo','isLogin'])
  },
  methods: {
    hideNavBar (){
      this.flag = false;
    },
    slide (){
      this.flag = !this.flag
    },
    quit (){
      this.$store.dispatch('quit').then(() => {
        this.$router.push('/home')
      })
    },
    changeSize (){
      if(document.body.offsetWidth < 750){
        this.flag = false;
      }else{
        this.flag = true
      }
    }
  },
  created(){
    var _this = this;
    window.onresize = function(){
      _this.changeSize()
    }
    _this.changeSize();
  },
  mounted(){
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mynav{
    background:@thum-bgColor;

    .navbar-brand,.navbar-brand:hover,.navbar-nav>li>a,.navbar-nav>.active>a,.navbar-nav>.active>a:hover{
      color:@thum-fontColor;
      cursor:pointer;
    }
    .navbar-nav>.active>a{
      background:lighten(@thum-bgColor,5%);
    }

    .navbar-nav>li>a:hover,.navbar-nav>.active>a:hover{
      background:lighten(@thum-bgColor,10%);
      color:@thum-fontColor;
    }

    .btn-default{
      color: @thum-fontColor;
      background-color: transparent;
      border-color: @thum-fontColor;
    }
    .form-control{
      background:transparent;
      border-color:@thum-fontColor;
    }
    .form-control::-webkit-input-placeholder{
      color:fade(@thum-fontColor,70%);
    }

    .headerPic{
      width:20px;
      height:20px;
      border-radius: 50%;
    }
  }
  @media (max-width: 768px){
    .navbar-collapse {
        position:fixed;
        top:0;
        right:15px;
        z-index: 100;
        background:@thum-bgColor;
        height:100%;
        transform:translate(0,0);
    }
  }
  .slide-nav-enter-active, .slide-nav-leave-active {
    transition: transform .5s;
  }
  .slide-nav-enter, .slide-nav-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translate(100%,0);
  }
</style>
