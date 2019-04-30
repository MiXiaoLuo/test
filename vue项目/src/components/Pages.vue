<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="(i,index) in totalRows.totalRows" :class="{active: index == totalRows.nowPage}"><router-link :to="{path:path,query:{page:index}}">{{i}}</router-link></li>
      <li>
        <a href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
      name: "Pages",
      props: ['totalRows'],
      data (){
        return {
          page: 0,
          path: location.hash.substr(2)
        }
      }
    }
</script>

<style scoped lang="less">
  .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
    background-color: @thum-bgColor;
    border-color: @thum-bgColor;
  }
</style>
