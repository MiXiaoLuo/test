<template>
    <div class="container">
      <h1 for="user" class="text-center">文章标题</h1>
      <div class="row">
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-1">
            <input type="text" v-model="title" class="form-control" placeholder="请输入文章的标题，不要带有侮辱性词汇">
          </div>
        </div>
      </div>
      <h1 class="text-center">文章内容</h1>
      <div class="row">
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-1">
            <div ref="e"></div>
            <!--<textarea class="form-control" v-model="context" placeholder="Email" rows="30"></textarea>-->
          </div>
        </div>
        <div class="col-sm-offset-1 col-sm-10">
          <button type="submit" class="btn btn-block btn-primary" @click="release">发布</button>
        </div>
      </div>
    </div>
</template>

<script>
  // 富文本编辑器
  import E from "wangeditor";
  export default {
    name: "PublishArticle",
    data (){
      return {
        title: '',
        context: '',
        editor: null
      }
    },
    methods: {
      release (){
        console.log(this.editor.txt.html())
        this.$ajax.post('/BBS/articleOperate?action=release',{
          title:this.title,
          context: this.editor.txt.html() //this.context
        }).then(res=> {
          if(res.data.code == 200){
            alert(res.data.success)
            this.$router.back();
          }else{
            alert(res.data.err)
          }
        })
      }
    },
    mounted (){
      this.editor = new E(this.$refs.e);
      this.editor.create()
    }
  }
</script>

<style scoped>

</style>
