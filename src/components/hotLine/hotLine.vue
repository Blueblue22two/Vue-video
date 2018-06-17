<template>
    <div class="hotLine">
        <div class="nav">
            <p><span>正在热映</span></p>
        </div>
        <div class="content">
            <ul class="m-hotLine">
                <li v-for="(movies,index) in hotLine" :key="index">
                    <div class="m-img">
                        <span v-if="movies.imax === true" class="mover-er"></span>
                        <img :src="movies.img" alt="" @click="rg(movies.id)">
                    </div>
                    <span>{{movies.nm}}</span>
                    <star :score="movies.sc"></star>
                    <span v-if="movies.sc === 0">暂无评分</span>
                    <span v-else>{{movies.sc}}分</span>
                    <a target="_blank" :href="'http://maoyan.com/cinemas?movieId=' + movies.id" class="buy">特惠购票</a>
                </li>
            </ul>
            <ul class="m-item">
                <span class="title">正在热映 · · · · · ·</span>
                <li v-for="(movies,index) in hotLine" :key="index">
                    <a href="javascript:void(0)" @click="rg(movies.id)"><span>{{index+1}}.{{movies.nm}}</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import star from '../../components/star/star.vue'
export default {
  data() {
    return {
      hotLine: {}
    }
  },
  created () {
    this._getHotline()
  },
  methods: {
    _getHotline () {
      const _this = this
      axios.get('maoyan/movie/list.json?type=hot&offset=0&limit=20')
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              _this.hotLine = res.data.data.movies
            }, 1500)
          }
        })
    },
    rg (id) {
      this.$router.push({name: 'info', params: {id: id, tag: 'maoyan'}})
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.hotLine
    width:85%
    margin: 0 auto
    .nav
        border-bottom: 1px solid #EEEEEE
        span
            display block
            margin: 30px 40px
            font-weight bold !important
            font-size: 16px !important
    .content
        width: 90%
        padding-top: 40px
        .m-hotLine
            height:auto
            li
                display block
                float: left
                margin-left: 15px
                margin-top: 5px
                text-align center
                .m-img
                    display block
                    cursor pointer
                    img
                        width: 165px
                        height: 220px
                    .mover-er
                        position: absolute
                        margin: 5px -3px
                        width: 69px;
                        height: 25px;
                        background-image url("imax.png")
                .buy
                    margin: 0 auto
                    display block
                    width:100px
                    color: #fff
                    letter-spacing: normal
                    word-spacing: normal
                    font-size: 14px
                    white-space: nowrap
                    line-height: 24px
                    font-weight bold
                    background-color : #268dcd
                    border-radius: 2px
                span
                    position: relative
                    line-height 25px
        .m-item
            position: absolute
            right: 125px
            .title
                font-size 18px
                color: #007722
                line-height:30px
            li
                margin-top: 10px
                padding-top:10px
                padding-left: 10px
                line-height 15px
                border-top: 1px dashed #ddd
                span:hover
                    background-color : #a4beff

</style>
