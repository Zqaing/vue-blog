<template>
  <div class="articlelist-container">
    <div class="article-list">
      <article class="article" v-for="{id, title, publishTime, content} in articles" :key="id">
        <header>
          <h2>
            <router-link class="title" :to="'/articles/' + id">{{ title }}</router-link>
          </h2>
          <h4 class="time">{{ publishTime }}</h4>
        </header>
        <p class="abstract" v-html="parseMarkdown(content)"></p>
        <footer>
          <router-link class="read-more" :to="'/articles/' + id">... continue reading</router-link>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
  import parseMarkdown from '@/utils/parseMarkdown'
  import axios from '@/utils/request'
  import moment from 'moment'
    export default {
      name: "Home",
      data(){
        return {
          articles: ''
        }
      },
      methods: {
        parseMarkdown
      },
      created(){
        axios.get('/home')
          .then(res=>{
            this.articles = res.data
            for (let article of res.data) {
              // 处理时间格式
              article.publishTime = moment(article.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')
            }
          }).catch(err=>{
            console.log(err)
        })
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  // 覆盖article全局样式
  .article {
    background-color: rgba(255,255,255,.1);
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
  h2 {
    border-bottom: none;
    padding: 0;
  }

  .title {
    color: #fff;
    padding-bottom: 0.3em;
  }

  .title:hover {
    border-bottom: 2px solid $base;
  }

  .read-more {
    color: $base;
    text-align: right;
    width: 100%;
    display: inline-block;
  }

  .pagination {
    @include flex($justify: space-between);
    font-size: 1.5rem;
    margin-top: 1.5em;
  }

  .abstract{
    color:#fff;
  }

  .prev,
  .next {
    a {
      cursor: pointer;
      color: $base;
    }
  }

  .hide {
    opacity: 0;
  }
</style>
