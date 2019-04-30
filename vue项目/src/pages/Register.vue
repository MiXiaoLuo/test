<template>
    <div class="bigBG">
      <div class="container box">
        <h3 class="text-center">注册</h3>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-horizontal">
              <div class="form-group">
                <label for="user" class="col-sm-2 control-label">账号</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="user" v-model="user" placeholder="请输入6-12位数字、字母组合">
                </div>
              </div>
              <div class="form-group">
                <label for="pass" class="col-sm-2 control-label">密码</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="pass" v-model="pass" placeholder="请输入您的密码">
                </div>
              </div>
              <div class="form-group">
                <label for="againpass" class="col-sm-2 control-label">确认密码</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="againpass" v-model="againpass" placeholder="请再次输入您的密码">
                </div>
              </div>
              <div class="form-group">
                <label for="nickname" class="col-sm-2 control-label">昵称</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="请输入您的昵称，一旦注册将不能更改">
                </div>
              </div>
              <div class="form-group">
                <label for="truename" class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="truename" v-model="truename" placeholder="请输入您的真实中文姓名">
                </div>
              </div>
              <div class="form-group">
                <label for="identificationCard" class="col-sm-2 control-label">身份证号</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="identificationCard" v-model="identificationCard" placeholder="请输入您的身份证号码">
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-sm-2 control-label">手机号码</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control" id="phone" v-model="phone" placeholder="请输入您的手机号码">
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            这里写些什么呢？先空着吧！
            <p>返回<router-link to="/home">首页</router-link></p>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-1 col-sm-10">
              <button type="submit" class="btn btn-block btn-primary" @click="register">注册</button>
            </div>
          </div>
        </div>
      </div>
      <my-alert :show-flag="options"></my-alert>
    </div>
</template>

<script>
    export default {
      name: "Register",
      data (){
        return {
          user:'',
          pass:'',
          againpass:'',
          truename: '',
          identificationCard: '',
          phone: '',
          nickname:'',
          options: null
        }
      },
      methods: {
        register(){
          this.$ajax.post('/BBS/AdminLoginAndRegister?action=register',{
            userName:this.user,
            passWord:this.pass,
            againPass:this.againpass,
            trueName: this.truename,
            identificationCard: this.identificationCard,
            phone: this.phone,
            nickName: this.nickname
          }).then(res=> {
            if(res.data.code == 200){
              this.$router.push('/login');
            }else{
              this.options = {
                title: '发生错误！',
                text: '注册失败！失败原因：' + res.data.err,
                theme: 'alert-danger'
              }
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
    background:rgba(255,255,255,0.4);
    padding:20px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);


    input[type='number']{-moz-appearance:textfield;}
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}
  }
}
@media (max-width: 768px){
  .bigBG{
    .box {
        width:100%;
        background:transparent;
        .form-group{
          margin-bottom:15px;

          label{
            display:none;
          }
        }
    }
  }
}
</style>
