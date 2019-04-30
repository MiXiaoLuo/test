<template>
    <div>
      <Header></Header>
      <div class="container">
        <div class="row">
          <div class="col col-md-3 left">
            <div class="userPic">
              <img width="100%" height="100%" :src="baseURL + userInfo.headPicture" alt="">
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title text-center">{{userInfo.nickName}}</h3>
              </div>
              <div class="panel-body">
                <p>姓名：{{userInfo.trueName}}</p>
                <p>手机号：{{userInfo.phone}}</p>
                <p>创建日期：{{userInfo.creationDate}}</p>
                <router-link to="/updateMyInfo">[点击编辑个人信息]</router-link>
              </div>
            </div>
          </div>
          <div class="col col-md-9">
            <p>
              <router-link to="/publish" class="btn btn-primary">发布文章</router-link>
            </p>
            <h1>我的文章列表</h1>
            <ArticleList :action-name="actionName" ></ArticleList>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Header from '@/components/Header';
  import ArticleList from '@/components/ArticleList';
  export default {
    name: "Mycenter",
    data (){
      return {
        actionName: 'getMyArticle'
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo;
      },
      ...mapState(['isLogin'])
    },
    mounted(){
      this.pic = this.userInfo.headPicture
    },
    components: {
      Header,
      ArticleList
    }
  }
</script>

<style scoped lang="less">
  .left{
    border-right:2px solid @thum-bgColor;
    .userPic{
      width:100%;
      height:100%;
      border-radius: 50%;
      overflow:hidden;
      margin:30px auto
    }
    .panel-default>.panel-heading{
      background:@thum-bgColor;
      color:#fff;
    }
  }
  @media (max-width: 768px){
    .left{
      border:none;
      .userPic {
          width:100px;
          margin:0 auto 20px;
      }
    }
    
  }
</style>
