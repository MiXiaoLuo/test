<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1 class="page-header text-center">{{articleContent.title}}</h1>
      <div class="panel panel-default">
        <div class="panel-heading">发布日期：{{articleContent.creationDate}}</div>
        <div class="panel-body" v-html="articleContent.context"></div>
        <div class="panel-footer text-right">发布人：{{articleContent.nickName}}</div>
      </div>
      <CommentArea></CommentArea>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import CommentArea from '@/components/CommentArea';
  import {mapState} from 'vuex';
  export default {
    name: "ArticleContent",
    computed: mapState(['articleContent','getComment']),
    mounted (){
      this.$store.dispatch('getArticleContent',this.$route.params.id)
    },
    components: {
      Header,
      CommentArea
    }
  }
</script>

<style scoped>
/*/
  .panel-body{
    background:black;
  }
  
/*}*/

</style>
