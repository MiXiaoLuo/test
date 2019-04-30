import axios from 'axios'
export default {
  getUserInfo(context){
    axios.post('/BBS/UserAction?action=getUserInfo').then(res => {
      if(res.data.code == 200){
        context.commit('getUserInfo',res.data.data)
      }
    })
  },
  quit ({commit}){
    axios.get('/BBS/UserAction?action=quit').then(res => {
      if(res.data.code == 200){
        commit('getUserInfo',{});
        commit('getMyArticle',{});
      }else{
        alert(res.data.err)
      }
    })
  },
  getArticleList ({commit},obj){
    axios.get('/BBS/articleOperate?action='+obj.actionName+'&page=' + obj.page).then(res => {
      if(res.data.code == 200){
        commit(obj.actionName,res.data);
      }else{
        alert(res.data.err);
      }
    })
  },
  getArticleContent ({dispatch,commit},id){
    return axios.get('/BBS/articleOperate?action=getArticleContent&articleId=' + id).then(res => {
      if(res.data.code == 200){
        commit('getArticleContent',res.data.data)
        dispatch('getComment',res.data.data.articleId)
      }else{
        alert(res.data.err);
      }
    })
  },
  getComment ({commit},id){
    return axios.get('/BBS/commentAction?action=getCommentList',{params:{
      articleId: id
    }}).then(res => {
      if(res.data.code == 200){
        commit('getComment',res.data.data)
      }
    })
  }
}
