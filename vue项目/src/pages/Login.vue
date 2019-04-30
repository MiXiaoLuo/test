<template>
  <div class="bigBG">
    <div class="box">
      <h3 class="text-center">登录</h3>
      <div class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">账号</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" v-model="user" placeholder="请输入6-12位数字、字母组合">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" v-model="pass" placeholder="请输入您的密码">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-3">
            <div class="checkbox">
              <label>
                <input type="checkbox"> 记住账号
              </label>
            </div>
          </div>
          <div class="col-sm-offset-5 col-sm-3">
            <div class="checkbox">
              <router-link to="">忘记密码</router-link>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-10">
            <button type="submit" class="btn btn-block btn-primary" @click="login">登录</button>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-10 text-right">
            没有账号？还不赶紧<router-link to="/register">注册</router-link>！
          </div>
        </div>
      </div>
    </div>
    <my-alert :show-flag="options"></my-alert>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data (){
      return {
        user: '',
        pass: '',
        pic:'',
        options: null
      }
    },
    methods: {
      login(){
        this.$ajax.post('/BBS/AdminLoginAndRegister?action=login',{
          userName: this.user,
          passWord: this.pass
        }).then(res => {
          if(res.data.code == 200){
            this.$router.push('home');
          }else{
            this.options = {
              title: '发生错误！',
              text: '登录失败：' + res.data.err,
              theme: 'alert-danger'
            }
            this.flag = true
            // alert('登录失败：' + res.data.err);
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .bigBG{
    width:100vw;
    height:100vh;
    background:radial-gradient(lighten(@thum-bgColor,30%),@thum-bgColor);
    position:relative;

    .box{
      width:500px;
      background:rgba(255,255,255,0.4);
      padding:20px;
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
  }
  @media (max-width: 768px){
    .bigBG{
      .box {
          width:90%;
      }
    }
    
  }
</style>
