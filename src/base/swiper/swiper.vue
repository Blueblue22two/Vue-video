<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(str,index) in listImg.data" :key="index">
                <img :src="getImages (str.subject.images.large)" alt="">
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <transition name="fade">
            <div v-if="detailShow" class="detail" @scroll.prevent>
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                            <span class="title">{{showContent.title}} ( {{showContent.year}})</span>
                            <div class="left">
                                <img :src="getImages(showContent.images)" alt="" width="135" class="movie-img">
                            </div>

                            <div class="right">
                                <ul class="v-content">
                                    <li class="v-directors">
                                        <span class="title">导演：</span>
                                        <span>{{showContent.directors.name}}</span>
                                    </li>
                                    <li class="v-casts" >
                                        <span class="title">主演：</span>
                                        <div v-for="(str, index) in showContent.casts" :key="index">
                                            <span>{{str.name}}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="title">类型：</span>
                                        <span>{{showContent.genres}}</span>
                                    </li>
                                    <li>
                                        <span class="title">制片国家/地区：</span>
                                        <span>美国 / 英国</span>
                                    </li>
                                    <li>
                                        <span class="title">语言：</span>
                                        <span>英语 / 汉语普通话</span>
                                    </li>
                                    <li>
                                        <span class="title">上映时间：</span>
                                        <span>{{showContent.year}}（美国/大陆）</span>
                                    </li>
                                    <li>
                                        <span class="title">又名：</span>
                                        <span>{{showContent.original_title}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="casts">
                                <div class="casts-title">主演：</div>
                                <ul class="casts-list">
                                    <li v-for="(str, index) in showContent.casts" :key="index" >
                                        <img :src="getImages(str.avatars.small)" alt="" width="50px">
                                        <span>{{str.name}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="directors">
                                <div class="director-title">导演：</div>
                                <img :src="getImages(showContent.directors.avatars.small)" alt="" width="50">
                                <span>{{showContent.directors.name}}</span>
                            </div>
                            <div class="v-star">
                                <span class="s-title">豆瓣评分：</span>
                                <span class="s-rating">{{showContent.title}}：{{showContent.rating}}分</span>
                                <span class="s-count">参与评分：{{showContent.collect_count}}人</span>
                                <star :score="showContent.rating"></star>
                            </div>
                        </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>

            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import star from '../../components/star/star.vue'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import {saveToLocal, loadFromLocal} from '../../common/js/store.js'

export default {
  data () {
    return {
      listImg: {
        title: '北美票房榜',
        data: []
      },
      detailShow: false,
      showContent: {
        title: '',
        casts: [],
        directors: {
          name: '',
          avatars: []
        },
        genres: [],
        images: '',
        rating: [],
        year: '',
        original_title: '',
        collect_count: ''
      }
    }
  },
  created () {
    this._initlistImg()
  },
  mounted () {
    setTimeout(() => {
      const list = loadFromLocal()
      this.listImg['data'] = list.listImg
    }, 2000)
    setTimeout(() => {
      this._initSwiper()
    }, 2000)
  },
  methods: {
    _initSwiper () {
      const _this = this
      var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        setWrapperSize: true,
        slidesPerView: 5,
        indicatorDots: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 1,
          depth: 60,
          modifier: 2,
          slideShadows: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        speed: 600,
        autoplay: true,
        interval: 2000
      })

      swiper.setGrabCursor()
      swiper.on('click', function () {
        _this.showDetail(swiper.realIndex)
      })
    },
    _initlistImg () {
      const _this = this
      let list = loadFromLocal()
      if (!list) {
        _this._getlistImg()
      }
    },
    _getlistImg () {
      axios.get('/api/v2/movie/us_box')
        .then((res) => {
          if (res.status === 200) {
            const list = res.data.subjects
            saveToLocal('listImg', list)
          }
        }).catch(function (error) {
          console.log(error)
        })
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7)
        return 'https://images.weserv.nl/?url=' + _u
      }
    },
    showDetail(index) {
      const _this = this
      this.detailShow = true
      _this.showContent.title = _this.listImg.data[index].subject.title
      _this.showContent.casts = _this.listImg.data[index].subject.casts
      _this.showContent.directors.name = _this.listImg.data[index].subject.directors[0].name
      _this.showContent.directors.avatars = _this.listImg.data[index].subject.directors[0].avatars
      _this.showContent.genres = _this.listImg.data[index].subject.genres
      _this.showContent.images = _this.listImg.data[index].subject.images.small
      _this.showContent.rating = _this.listImg.data[index].subject.rating.average
      _this.showContent.year = _this.listImg.data[index].subject.year
      _this.showContent.original_title = _this.listImg.data[index].subject.original_title
      _this.showContent.collect_count = _this.listImg.data[index].subject.collect_count
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .swiper-container
        width: 100%;
        height: 375px;
        margin-top: 10px
        background-color aliceblue;
        .swiper-wrapper
            width: 100%;
            height: 100%;
        .swiper-slide
            background-position center
            background-size: cover;
            width: 100%;
            height: 100%;
            overflow hidden
            img
                width: 100%
                height: 100%
        .swiper-pagination-bullet
            width: 12px;
            height: 12px;
            background: rgba(117, 123, 122, 1);
        .swiper-pagination-bullet-active
            width: 30px;
            height: 12px;
            background: rgba(117, 123, 122, 0.6);
            border-radius: 6px;
        .fade-transition
            opacity: 1
        .fade-enter-active, .fade-leave-active
            transition: opacity .5s
        .fade-enter, .fade-leave-to
            opacity: 0
            background: rgba(7, 17, 27, 0)
        .detail
            position: fixed
            top: 0
            left: 0
            width: 100%
            height: 100%
            overflow: hidden
            z-index: 100
            background: rgba(7, 17, 27, 0.8)
            backdrop-filter: blur(10px)
            .detail-wrapper
                width: 100%
                min-height: 100%
                display: block
                color: #fff
                z-index: 1111
                &:after
                    display: block
                    content: "."
                    height: 0
                    ling-height: 0
                    clear: both
                    visibility: hidden
                .detail-main
                    width: 750px
                    padding-top: 5px
                    margin-left: 280px
                    .title
                        margin-left: 5px
                        display block
                        line-height: 26px
                        word-wrap :break-word
                        font-size: 26px
                        font-weight: bold
                    .movie-img
                        margin: 18px 0 0 25px
                    .casts
                        position relative
                        margin-left:50px
                        .casts-title
                            position absolute
                            display: inline-block
                            margin: 30px 0 0 20px
                        .casts-list
                            margin: 8px 0 0 50px
                            li
                                float: left
                                margin-left:25px
                                img
                                    display block
                                span
                                    width: 55px
                                    display: -webkit-box
                                    -webkit-box-orient: vertical
                                    -webkit-line-clamp: 1
                                    overflow: hidden
                                    text-overflow: ellipsis
                    .directors
                        position :absolute
                        width:120px
                        margin-left: 345px
                        .director-title
                            position: relative
                            display: inline-block
                            margin: 30px 0 0 -100px
                        img
                            float: left
                            margin-left: 50px
                            display: block
                        span
                            width: 55px
                            margin-left: 55px
                            display: -webkit-box
                            -webkit-box-orient: vertical
                            -webkit-line-clamp: 1
                            overflow: hidden
                            text-overflow: ellipsis

                    .right
                        position: absolute
                        top: 50px
                        margin-left: 180px
                        width: 300px
                        height:185px
                        border: 1px solid #666666
                        padding-top: 10px
                        li
                            position: relative
                            margin-top: 3px
                            font-size:16px
                            span
                                position: relative
                                display inline-block
                            .title
                                width: 110px
                                text-align :center
                                color:#666666
                                font-size:14px
                                line-height :14px
                            div
                                position relative
                                clear:both
                                margin-left: 120px

                    .v-star
                        position: absolute
                        margin-left:515px
                        top: 100px
                        width: 200px
                        height: 200px
                        text-align center
                        .s-title
                            position: relative
                            top:-20px
                            font-size: 20px
                            font-weight bold
                        .s-rating
                            position:relative
                            display block
                            top: -5px
                        .s-count
                            position:relative
                            display block
                            top: -5px
                        .s-count
                            position:relative
                            display block
                            top:60px
            .detail-close
                position: relative
                display block
                width: 32px
                height: 32px
                margin: -64px auto
                clear: both
                font-size: 32px
                border: 1px solid #FFF6F6
                border-radius: 32px
                cursor pointer
</style>
