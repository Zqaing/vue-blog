<template>
  <div style="height:100%">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="tag-container main">
      <h2>标签选择 /
        <span>CHOOSE BY TAG</span>
      </h2>
      <hr>
      <main>
        <div class="tag-list">
          <section class="tag">
            <h5>标签</h5>
            <ul class="tags" @click="chooseTag($event)">
              <li class="tag" :class="{chosen:chosenTags.indexOf(tag) !== -1}" v-for="tag,index in tags" :key="index">{{ tag }}</li>
            </ul>
          </section>
          <section class="chosen-tag" v-show="chosenTags.length">
            <h5>修改标签</h5>
            <ul class="tags">
              <li class="tag-edit" v-for="tag,index in chosenTags">
                <input type="text" class="tag-input" :value="tag" @change="changeTag($event,index)">
                <sup @click="deleteTags(tag,index)">x</sup>
              </li>
            </ul>
          </section>
          <article-list v-on:tags="getTags" ref="articleList"></article-list>
        </div>
        <editor></editor>
      </main>
    </div>
  </div>
</template>

<script>
    import ArticleList from "./common/ArticleList";
    import Aside from "./common/Aside";
    import HeadNav from "./common/HeadNav";
    import Editor from "./common/Editor";
    import request from '@/utils/request'
    export default {
      name: "Tag",
      components: {
        ArticleList,
        Aside,
        HeadNav,
        Editor
      },
      data(){
        return {
          tags:[],
          chosenTags:[]
        }
      },
      created(){
        request({
          url:'/gettags',
          method:'get',
          data:{}
        }).then(res=>{
          for (var a = 0;a<res.length;a++){
            if(res[a].TAGS !== ''){
              res[a].TAGS = res[a].TAGS.split(',')
              this.tags =this.tags.concat(res[a].TAGS)
              this.tags = Array.from(new Set(this.tags))
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      methods:{
        getTags(tags) {
          console.log(tags)
          this.tags.push(...tags)
        },
        //获取标签相对应的文章
        chooseTag(evt){
          if(evt.target.tagName === 'LI'){
            const value = evt.target.innerHTML
            if(!evt.target.classList.contains('chosen')){
              this.chosenTags.push(value)
            }else{
              this.chosenTags = this.chosenTags.filter(val => val !== value)
            }
            this.$refs.articleList.updateListByTags(this.chosenTags)
          }
        },
        //删除标签
        deleteTags(tag,index){
          const tagIndex = this.tags.indexOf(tag)
          //删除修改标签里的标签
          this.chosenTags.splice(index,1)
          //删除标签里的标签
          this.tags.splice(tagIndex,1)
          this.$refs.articleList.updateListByTags(this.chosenTags)
          //删除文章里面的标签
          this.$refs.articleList.deleteArticleTag(tag)
        },
        changeTag(event,i){
          const oldVal = this.chosenTags[i]
          const newVal = event.target.value
          if(!newVal){
            alert('请直接删除tag!')
            evt.target.value = oldVal
            return
          }
          const tarIndex = this.tags.indexOf(oldVal)
          if(this.tags.indexOf(newVal) !== -1){
            this.chosenTags.splice(i,1)
            this.tags.splice(tarIndex,1)
          }else{
            this.chosenTags.splice(i,1,newVal)
            this.tags.splice(tarIndex,1,newVal)
          }
          this.$refs.articleList.updateTag(oldVal,newVal,this.chosenTags)
        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  main {
  @include flex($justify: space-between);
    height: calc(100% - 48px);
    padding: 0.5em 0;
  }

  .tag-list {
    width: 40%;
    height: 100%;
    overflow: auto;
    padding: 0 0.8em 0.5em 0;
  .tags {
  @include flex($justify: flex-start);
    list-style: none;
    margin-bottom: 2em;
    padding: 0;
  .tag {
    margin: 0 1em 1em 0;
    padding: 0.3em;
    color: $base;
    border-radius: 2px;
    border: 1px solid $base;
    cursor: pointer;
  }
  .chosen {
    color: $white;
    background: $base;
  }

  .tag-edit {
    margin-right: 3px;
  }
  }
  .list {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  }

  .editor {
    width: 58%;
    height: 100%;
    padding: 0 0.8em 0.5em 0;
    overflow: auto;
  }
</style>
