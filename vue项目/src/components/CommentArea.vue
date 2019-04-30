<template>
    <div>
      <div class="alert alert-danger" v-if="!userInfo.isLogin">登录后才能看精彩评论哦~</div>
      <div v-else>
        <p><textarea class="form-control" rows="3" v-model="commentMain"></textarea></p>
        <p class="text-right"><button class="btn btn-primary" @click="comment">评论</button></p>
        <div class="text-center" v-if="getComment.length == 0"><h3>暂无评论~</h3></div>
        <div v-else>
          <ul class="media-list">
            <li class="media" v-for="(data,index) in getComment">
              <div class="media-left">
                <a href="#">
                  <img class="media-object" :src="baseURL + data.headPicture" alt="...">
                </a>
              </div>
              <div class="media-body">
                <p class="heading"><span class="userName">{{data.nickName}}</span> <span class="time">{{data.creationDate}}</span></p>
                <p class="context">{{data.content}}</p>
                <p class="pull-left">
                  <span @click="praise(data.commentId)" style="cursor:pointer"><i class="glyphicon glyphicon-thumbs-up"></i> 赞 ({{data.praiseNum}})</span>
                  <span style="cursor:pointer" @click="clickReply(data)">回复</span>
                </p>
                <p class="clearfix"></p>
                <transition name="reply">
                  <div class="replyBox" v-if="data.flag">
                    <p><textarea class="form-control" cols="30" rows="2" v-model="replyContext"></textarea></p>
                    <p><button class="btn btn-primary" @click="sendReply(data.articleId,data.commentId,data.userId)">确定</button> <button class="btn" @click="hideReply(data)">取消</button></p>
                  </div>
                </transition>

                <div class="media" v-for="(item,i) in data.replyList">
                  <div class="media-left">
                    <a href="#">
                      <img class="media-object" :src="baseURL + item.headPicture" alt="...">
                    </a>
                  </div>
                  <div class="media-body">
                    <p class="heading"><span class="userName">{{item.nickName}}</span> 对 <span>{{item.to_nickName}}</span> 说： <span class="time">{{item.creationDate}}</span></p>
                    <p class="context">{{item.content}}</p>
                    <p class="pull-left">
                      <span style="cursor:pointer" @click="clickReply(item)">回复</span>
                    </p>
                    <p class="clearfix"></p>
                    <transition name="reply">
                      <div class="replyBox" v-if="item.flag">
                        <p><textarea class="form-control" cols="30" rows="2" v-model="replyContext"></textarea></p>
                        <p><button class="btn btn-primary" @click="sendReply(data.articleId,data.commentId,item.from_uid)">确定</button> <button class="btn" @click="hideReply(item)">取消</button></p>
                      </div>
                    </transition>
                  </div>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: "CommentArea",
    data(){
      return {
        commentMain:'',
        flag:[],
        replyContext: ''
      }
    },
    computed:{
      ...mapState(['userInfo','articleContent','getComment'])
    },
    methods:{
      sendReply (articleId,commentId,to_uid){
        console.log(to_uid)
        this.$ajax.post('/BBS/commentAction?action=reply',{
          articleId,
          commentId,
          to_uid,
          content: this.replyContext
        }).then(res => {
          if(res.data.code == 200){
            alert(res.data.success);
            this.$store.dispatch('getComment',this.$route.params.id);
            this.replyContext = ''
          }else{
            alert(res.data.err)
          }
        })
      },
      clickReply (data){
        this.$set(data,'flag',true)
      },
      hideReply(data){
        this.$set(data,'flag',false);
      },
      comment (){
        this.$ajax.post('/BBS/commentAction?action=reportComment',{
          articleId: this.articleContent.articleId,
          content: this.commentMain
        }).then(res => {
          if(res.data.code == 200){
            alert(res.data.success);
            this.$store.dispatch('getComment',this.$route.params.id);
            this.commentMain = ''
          }else{
            alert(res.data.err)
          }
        })
      },
      praise (id){
        this.$ajax.get('/BBS/commentAction?action=praise',{
          params: {
            commentId : id
          }
        }).then(res => {
          if(res.data.code == 200){
            alert(res.data.success)
            this.$store.dispatch('getComment',this.$route.params.id)
          }else{
            alert(res.data.err)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .media{
    .media-object{
      width:30px;
      height:30px;
    }
    .media-body{
      color:#999;
      .heading{
        font-size:14px;
        margin-top:5px;

        .userName{
          color:#0a8ed9
        }
        .time{
          margin-left:12px;
        }
      }
      .context{
        color:#222;
        font-size:16px;
        line-height:24px;
      }
    }
    .reply-enter-active, .reply-leave-active {
      transition: opacity .3s;
    }
    .reply-enter, .reply-leave-to{
      opacity: 0;
    }
  }
</style>
