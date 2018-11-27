<template>
  <article class="art-head" style="height:712px">
    <header>
      <h1>{{ title }}</h1>
      <h4 class="time">{{ publishTime }}</h4>
      <h4>
        <span class="tag" v-for="tag in tags">{{ tag }}</span>
      </h4>
    </header>
    <p v-html="parseMarkdown(content)"></p>
  </article>
</template>

<script>
  import parseMarkdown from "../utils/parseMarkdown";
  import moment from 'moment'
  import axios from '../utils/request'
  export default {
    name: "Article",
    data(){
      return {
        title: '',
        publishTime: '',
        tags: '',
        content: ''
      }
    },
    created(){
      const id = this.$route.params.id
      axios.get(`/article/${id}`).then(res=>{
        const data = res.data[0]
        this.title = data.title
        this.publishTime = moment(data.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')
        this.content = data.content
        this.tags = data.tags ? data.tags.split(',') : []
      }).catch(err=>{
        console.log(err)
      })
    },
    methods: {
      parseMarkdown
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
 .time{
   color: $base;
 }
</style>
