<template>
<div class="info">
    <div class="left">
        <span v-if="movieInfo.imax === true" class="mover-er"></span>
        <img :src="movieInfo.img" alt="">
    </div>
    <div class="right">
        <span class="title">{{movieInfo.nm}}</span>
        <div class="v-content">
            <ul>
                <li>{{movieInfo.cat}}</li>
                <li>{{movieInfo.src}} / {{movieInfo.dur}}分钟</li>
                <li>{{movieInfo.rt}}（中国大陆）</li>
                <li><a target="_blank" :href="'http://maoyan.com/cinemas?movieId=' + movieInfo.id" class="buy">特惠购票</a></li>
            </ul>
        </div>
        <div class="pf">
            <span>用户评分</span>
            <span>{{movieInfo.sc}}</span>
            <star :score="movieInfo.sc"></star>
            <span>参与人数 {{movieInfo.snum}}</span>
        </div>
    </div>
    <div class="main">
        <div class="jqjj">
            <h3>剧情简介</h3>
            <span class="dra" v-html="movieInfo.dra">{{movieInfo.dra}}</span>
        </div>
        <div class="yzry">
            <h3>演职人员</h3>
            <ul>
                <li>
                    <span>导演</span>
                    <span>{{movieInfo.dir}}</span>
                </li>
                <li v-for="(str,index) in star" v-if="index<4" :key="index">
                    <span>演员</span>
                    <span>{{str}}</span>
                </li>
            </ul>
        </div>
        <div class="tj">
            <h3>图集</h3>
            <div class="movie-img">
                <div v-for="(str,index) in movieInfo.photos" :key="index" v-if="index === 0" class="b-img">
                    <img :src="getImages (str)">
                </div>
                <ul class="s-img">
                    <li v-for="(str,index) in movieInfo.photos" :key="index" v-if="index>0 && index<5">
                        <div  v-bind:style="{backgroundImage: 'url(' + getImages (str) + ')'}"></div>
                    </li>
                </ul>
            </div>
            <div class="video">
                <h3>宣传Video</h3>
                <video :src="movieInfo.vd" controls="controls" ></video>
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
import axios from 'axios'
import star from '../star/star.vue'
import comment from '../comment/comment.vue'
import qs from 'qs'
export default {
  data () {
    return {
      id: '',
      tag: '',
      movieInfo: {},
      commentInfo: {},
      img: 'img-',
      comment: [],
      sum: []
    }
  },
  created () {
    this.getParams()
  },
  computed: {
    star: function () {
      return this.movieInfo.star.split(' ')
    }
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    getParams () {
      const _this = this
      const tag = this.$route.params.tag
      const id = this.$route.params.id
      _this.id = id
      _this.tag = tag
      if (tag === 'maoyan') {
        _this.getInfo(id)
      }
      _this.comment = []
      _this.getComment()
    },
    getInfo (id) {
      const _this = this
      axios.get('maoyan/movie/' + id + '.json')
        .then((res) => {
          if (res.status === 200) {
            _this.movieInfo = res.data.data.MovieDetailModel
            _this.commentInfo = res.data.data.CommentResponseModel
          }
        })
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(26)
        return 'https://images.weserv.nl/?url=p0.meituan.net/465.258/' + _u
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
.info
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
            margin-top: 20px
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