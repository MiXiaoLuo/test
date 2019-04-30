<template>
  <div>
    <div class="container">
      <button class="btn" @click="$router.back()">返回</button>


      <div class="form-horizontal">
        <div class="form-group">
          <label for="nickName" class="col-sm-2 control-label">更改头像</label>
          <div class="col-sm-10">
            <input type="file" class="file" ref="file" @change="changePic">
            <div class="picBox" ref="picBox"></div>
            <button class="btn btn-success" @click="sendHeaderPic">上传头像</button>
          </div>
        </div>
        <div class="form-group">
          <label for="nickName" class="col-sm-2 control-label">修改昵称</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" v-model="nickName" id="nickName" placeholder="请使用数字、字母、下划线、中文">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default" @click="updateNick">更改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UpdateMyInfo",
    data (){
      return {
        nickName : ''
      }
    },
    methods:{
      changePic(){
        var reader = new FileReader();
        var result = this.$refs.file.files[0];
        reader.readAsDataURL(result);
        var _this = this;
        reader.onload = function(){
          _this.$refs.picBox.innerHTML = `<img width="100%" height="100%" src="${this.result}" alt=""/>`
        }
      },
      sendHeaderPic (){
        let formdata = new FormData();
        formdata.append("data", this.$refs.file.files[0]);
        this.$ajax.post('/BBS/psTouch?action=headerPic',formdata).then(res => {
          if(res.data.code == 200){
            alert(res.data.success);
            location.reload();
          }else{
            alert(res.data.err);
          }
        })
      },
      updateNick (){
        this.$ajax.post('/BBS/UserAction?action=updateUserInfo',{
          nickName : this.nickName
        }).then(res => {
          if(res.data.code == 200){
            alert(res.data.success)
          }else{
            alert(res.data.err)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.file{
  width:300px;
  height:300px;
  position:absolute;
  top:0;
  opacity: 0;
}
.picBox{
  width:300px;
  height:300px;
  background:#fff;
  border:1px solid #ccc;
}
</style>
