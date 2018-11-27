<template>
  <div style="height:100%">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="about-container main">
      <h2>
        关于我 /
        <span>ABOUT ME</span>
      </h2>
      <hr>
      <main>
        <textarea></textarea>
        <section class="btn-container">
          <button class="not-del" @click="updateAbout">提交修改</button>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  import Aside from "./common/Aside";
  import HeadNav from "./common/HeadNav";
  import request from '@/utils/request'
  import SimpleNDE from 'simplemde'
  export default {
    name: "About",
    components: {
      Aside,
      HeadNav
    },
    data(){
      return {
        simplemde:'',
        id:''
      }
    },
    mounted(){
      this.simplemde = new SimpleNDE({
        spellChecker:false,
        toolbarTips: false,
      })
      request({
        url:'/briefs',
        method:'get',
      }).then(res=>{
        this.id = res[0].id
        this.simplemde.value(res[0].content)
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      updateAbout(){
        request({
          url: `/updates`,
          method:'post',
          data:{
            content: this.simplemde.value(),
            id:this.id
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  main {
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
    font-size: 1.6rem;
  }

  .btn-container {
  @include flex($justify: flex-end);
  }
</style>
