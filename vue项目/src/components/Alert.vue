<template>
    <div style="position:absolute;width:100%;">
      <transition name="alert-show">
          <div class="modal-dialog" role="document" v-if="flag">
            <div class="modal-content">
              <div class="modal-header alert" :class="showFlag.theme">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-center">{{showFlag?showFlag.title:''}}</h4>
              </div>
              <div class="modal-body">
                <p>{{showFlag?showFlag.text:''}}</p>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
      </transition>
    </div>
</template>

<script>
  export default {
    name: "Alert",
    props: ['showFlag'],
    data (){
      return {
        flag: false,
        time: null
      }
    },
    watch: {
      showFlag (){
        this.flag = true;
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          this.flag = false
        },1500)
      }
    }
  }
</script>

<style scoped lang="less">
  .modal{
    display:block;
    opacity: 1;
  }
  .alert-show-enter-active, .alert-show-leave-active {
    transition: opacity .5s;
  }
  .alert-show-enter, .alert-show-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
