<template>
    <div>
      <div class="list-group">
        <router-link :to="{name:'ArticleContent',params:{id: item.articleId}}" class="list-group-item" v-for="(item,index) in myArticle" :key="index"><div class="pull-right">{{item.nickName}}</div>{{item.title}}</router-link>
      </div>
      <Pages :totalRows="page"></Pages>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Pages from '@/components/Pages';
  export default {
    name: "ArticleList",
    props: ['actionName'],
    data (){
      return {}
    },
    computed :{
      myArticle (){
        var data = this.$store.state[this.actionName] ==undefined ? [{}] : this.$store.state[this.actionName].dataList;
        return data
      },
      page (){
        var data = this.$store.state[this.actionName] == undefined ? {} : this.$store.state[this.actionName]
        return data;
      }
    },
    watch :{
      '$route'(){
        this.$store.dispatch('getArticleList',{
          actionName:this.actionName,
          page:this.$route.query.page == undefined ? 0 : this.$route.query.page
        })
      }
    },
    mounted (){
      this.$store.dispatch('getArticleList',{
        actionName:this.actionName,
        page:this.$route.query.page == undefined? 0 : this.$route.query.page
      })
    },
    components: {
      Pages
    }
  }
</script>

<style scoped lang="less">
  .list-group-item.active, .list-group-item.active:focus, .list-group-item.active:hover{
    background-color: @thum-bgColor;
    border-color: @thum-bgColor;
  }
</style>
