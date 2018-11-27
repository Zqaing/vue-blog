<template>
  <div class="readinglist-container" style="height:712px">
    <h1>阅读列表</h1>
    <table>
      <tr>
        <th>书名</th>
        <th>作者</th>
        <th>评分</th>
      </tr>
      <tr v-for="{name, author, score} in books">
        <td class="col-1">{{ name }}</td>
        <td class="col-2">{{ author }}</td>
        <td class="col-3">
          <star :score="score"></star>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from '../utils/request'
  import Star from './common/Star'
  export default {
    name: "Lists",
    data(){
      return {
        books:''
      }
    },
    components: {
      Star
    },
    created(){
      axios.get('/books').then(res=>{
        this.books = res.data
      }).catch(err=>{
        alert(err)
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  table {
    width: 100%;
    background: rgba(255,255,255,.1);
    border-collapse: collapse;
    margin-bottom: 1em;
    th {
      padding: 0.5em 0;
      color: #fff;
      border-bottom: 1px solid #fff;
    }
    td {
      text-align: center;
      /*font-size: 1.3rem;*/
      padding: 1em 0;
      border-bottom: 1px dotted #fff;
    }

    .col-1,
    .col-2 {
      width: 25%;
    }

    .col-2 {
      border-left: 1px dotted #fff;
      border-right: 1px dotted #fff;
    }

    .col-3 {
      color: $base;
    }
  }
</style>
