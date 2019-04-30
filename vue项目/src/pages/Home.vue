<template>
    <div>
      <Header></Header>
      <div class="container">
        <h1>文章列表</h1>
        <ArticleList :action-name="actionName"></ArticleList>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/Header';
  import ArticleList from '@/components/ArticleList';
  export default {
    name: "Home",
    data (){
      return {
        actionName: 'getAllArticle'
      }
    },
    components: {
      Header,
      ArticleList
    }
  }
</script>

<style scoped lang="less">

</style>
