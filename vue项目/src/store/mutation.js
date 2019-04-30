export default {
  getUserInfo (state,data){
    state.userInfo = data;
  },
  getAllArticle (state,data){
    state.getAllArticle = data.data
  },
  getMyArticle (state,data){
    state.getMyArticle = data.data
  },
  getArticleContent (state,data){
    state.articleContent = data
  },
  getComment (state,data){
    state.getComment = data
  }
}
