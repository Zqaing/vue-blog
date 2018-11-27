<template>
    <div class="archive-container" style="height:712px">
      <h1>文章归档</h1>
      <section v-for="year in years">
        <h4>{{ year }}</h4>
        <ul class="list" v-for="intro in introductions[year]">
          <li class="li">
            <router-link :to="/articles/ + intro.id">{{ intro.title }}</router-link>
            <span class="time">{{ intro.publishTime }}</span>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
  import moment from 'moment'
  import axios from '@/utils/request'
  export default {
    name: "Archives",
    data(){
      return {
        introductions: {},
        years: []
      }
    },
    created(){
      axios.get('/home').then(res=>{
        for (let intro of res.data) {
          const introYear = moment(intro.publishTime).year()
          if (this.years.indexOf(introYear) === -1) {
            this.years.push(introYear)
            this.introductions[introYear] = []
          }
          intro.publishTime = moment(intro.publishTime).format('MM-DD')
          this.introductions[introYear].push(intro)
        }
      }).catch(err=>{
        console.log(err)
      })
    },

  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  .archive-container {
  ul {
    list-style-type: circle;
  li {
    position: relative;
    margin: 0.8em 0;
    background-color: rgba(255,255,255,.1);
    padding: 8px;
    border-radius: 5px;
    transition: .5s;
    /*&:hover{
     !* top: -3px;*!
      box-shadow: 5px 5px 5px #ccc;
    }*/
  }
  }

  .date {
    color: $special;
  }

  a {
    color: $base;
  }
  }
</style>
