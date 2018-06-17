<template>
    <div class="cinecismInfo">
        <div class="left">
            <span v-if="movieInfo.imax === true" class="mover-er"></span>
            <img :src="getImages(images.small)" alt="">
        </div>
        <div class="right">
            <span class="title">{{title}}</span>
            <span v-if="aka != undefined">{{aka}}</span>
            <div class="v-content">
                <ul>
                    <li>{{genres}}</li>
                    <li>{{countries[0]}} / 125 分钟</li>
                    <li>{{year}}（中国大陆）</li>
                </ul>
            </div>
            <div class="pf">
                <span>用户评分</span>
                <span>{{rating.average}}</span>
                <star :score="rating.average"></star>
                <span>参与人数 {{ratings_counts}}</span>
            </div>
        </div>
        <div class="main">
            <div class="jqjj">
                <h3>剧情简介</h3>
                <span class="dra" v-html="summary">{{summary}}</span>
            </div>
            <div class="yzry">
                <h3>演职人员</h3>
                <ul>
                    <li>
                        <span>导演</span>
                        <img :src="getImages(directors[0].avatars.small)" alt="" width="128" height="170" style="margin-top: 10px">
                        <span>{{directors[0].name}}</span>
                    </li>
                    <li v-for="(str, index) in casts" :key="index" v-if="index<4">
                        <span>演员</span>
                        <img :src="getImages(str.avatars.small)" alt="" width="128" height="170" style="margin-top: 10px">
                        <span>{{str.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="tj">
                <h3>图集</h3>
                <div class="movie-img">
                    <div class="b-img">
                        <img :src="getImages ('http://p0.meituan.net/movie/a5529645b45d43f77aafa5c2bf1d63f7360485.jpg.webp@465w_258h_1e_1c')" >
                    </div>
                    <ul class="s-img">
                        <li>
                            <div  v-bind:style="{backgroundImage: 'url(' + getImages ('https://img1.doubanio.com/view/photo/sqxs/public/p2456000979.webp') + ')'}"></div>
                        </li>
                        <li>
                            <div  v-bind:style="{backgroundImage: 'url(' + getImages ('https://img1.doubanio.com/view/photo/sqxs/public/p2512717486.webp') + ')'}"></div>
                        </li>
                        <li>
                            <div  v-bind:style="{backgroundImage: 'url(' + getImages ('https://img1.doubanio.com/view/photo/sqxs/public/p2515594409.webp') + ')'}"></div>
                        </li>
                        <li>
                            <div  v-bind:style="{backgroundImage: 'url(' + getImages ('https://img1.doubanio.com/view/photo/sqxs/public/p2514908989.webp') + ')'}"></div>
                        </li>
                    </ul>
                </div>
                <div class="video">
                    <h3>宣传Video</h3>
                    <video src="http://maoyan.meituan.net/movie/videos/854x480d365cf4cfec9488198fb075c983209bd.mp4" controls="controls" ></video>
                </div>
            </div>
            <div class="pl">
                <h3>电影评论</h3>
                <comment @refreshList="getComment" v-bind:comment="comment" v-bind:sum="sum" v-bind:id="id"></comment>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import star from '../star/star.vue'
import axios from 'axios'
import qs from 'qs'
import comment from '../comment/comment.vue'
export default {
  data () {
    return {
      id: '',
      tag: '',
      movieInfo: [],
      commentInfo: [],
      img: 'img-',
      aka: [],
      casts: [],
      collect_count: '',
      countries: [],
      directors: [],
      genres: [],
      images: [],
      rating: [],
      ratings_counts: '',
      summary: '',
      title: '',
      year: '',
      durations: [],
      comment: [],
      sum: []
    }
  },
  created () {
    this.getParams()
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    getParams () {
      const _this = this
      const id = this.$route.params.id
      _this.id = id
      _this.getInfo(id)
      _this.comment = []
      _this.getComment()
    },
    getInfo (id) {
      const _this = this
      const list = JSON.parse(sessionStorage.getItem('movie_' + id))
      _this.aka = list.aka
      _this.casts = list.casts
      _this.collect_count = list.collect_count
      _this.countries = list.countries
      _this.directors = list.directors
      _this.genres = list.genres
      _this.images = list.images
      _this.rating = list.rating
      _this.ratings_counts = list.ratings_count
      _this.summary = list.summary
      _this.title = list.title
      _this.year = list.year
      _this.durations = list.durations
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7)
        return 'https://images.weserv.nl/?url=' + _u
      }
    },
    getComment () {
      const _this = this
      axios.post('http://localhost:8088/video/index.php?g=Video&m=users&a=getComment', qs.stringify({
        id: _this.id
      }), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
        .then((res) => {
          if (res.data.success === true) {
            this.$nextTick(() => {
              _this.comment = res.data.info
              _this.sum = res.data.comment
            })
          }
        })
    }
  },
  components: {
    star,
    comment
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cinecismInfo
        width: 80%
        height: auto
        margin: 0 auto
        background: #F0F3F5
        color: #545652
        .left
            width: auto
            display inline-block
            img
                border: 4px solid #fff;
                height: 322px;
                width: 232px;
            .mover-er
                position: absolute
                margin: 8px -2px
                width: 69px;
                height: 25px;
                background-image url("imax.png")
        .right
            width: 70%
            top: 70px
            position:relative
            float right
            .title
                font-size: 26px
                font-weight: bold
            .v-content
                margin-top: 20px
                li
                    margin-top: 10px
                    line-height: 26px
                    font-size: 20px
                    .buy
                        display block
                        text-align center
                        width:120px
                        color: #fff
                        letter-spacing: normal
                        word-spacing: normal
                        font-size: 18px
                        white-space: nowrap
                        line-height: 30px
                        font-weight bold
                        background-color : #268dcd
                        border-radius: 3px
            .pf
                position: absolute
                top: 90px
                right: 295px
                span
                    margin-top: 10px
                    margin-bottom: 10px
        .main
            position:relative
            margin-top: 10px
            color: #000
            width: 100%
            display: block
            .jqjj
                margin-top: 20px
                h3:before
                    float: left
                    content: ""
                    display: inline-block
                    width: 4px
                    height: 18px
                    margin-right: 6px
                    background-color: #ef4238
                .dra
                    margin-top: 20px
                    font-size: 14px;
                    line-height: 26px;
            .yzry
                margin-top: 20px
                display block
                height: 100px
                h3:before
                    float: left
                    content: ""
                    display: inline-block
                    width: 4px
                    height: 18px
                    margin-right: 6px
                    background-color: #ef4238
                ul
                    position: relative
                    margin: 10px
                    display: block;
                    li
                        width: 180px
                        text-align center
                        margin-left: 20px
                        float: left
                        span
                            margin-top: 10px
                            line-height: 16px
                            display: block
            .tj
                width: 100%
                height: 345px
                margin-top: 200px
                position: relative
                h3:before
                    float: left
                    content: ""
                    display: inline-block
                    width: 4px
                    height: 18px
                    margin-right: 6px
                    background-color: #ef4238
                .movie-img
                    width: 730px
                    height: 258px
                    margin-top: 20px
                    margin-left: 6px
                    .b-img
                        img
                            width: 465px
                            height: 258px
                    .s-img
                        position: absolute
                        top: 40px
                        right: 295px
                        width:300px
                        li
                            top:0
                            display block
                            margin-left:6px
                            position: relative
                            float: left
                            width: 126px
                            height: 126px
                            div
                                position relative
                                width: 126px
                                height: 126px
                                background-position 50%
                .video
                    position:absolute
                    top: 40px
                    right:5px
                    h3
                        display block
                        margin: 0 auto
                        width: 100px
                    h3:before
                        float: left
                        content: ""
                        display: inline-block
                        width: 4px
                        height: 18px
                        margin-right: 6px
                        background-color: #ef4238
                    video
                        margin-top: 40px
                        width: 320px
                        height: auto
            .pl
                width: 100%
                height: auto
                margin-top: 10px
                position: relative
                h3:before
                    float: left
                    content: ""
                    display: inline-block
                    width: 4px
                    height: 18px
                    margin-right: 6px
                    background-color: #ef4238
</style>
