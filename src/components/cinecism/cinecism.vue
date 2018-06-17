<template>
    <div class="hotLine">
        <div class="nav">
            <p><span>北美票房榜</span></p>
        </div>
        <div class="content">
            <ul class="m-hotLine">
                <li v-for="(str,index) in listImg.data" :key="index">
                    <div class="m-img">
                        <img :src="getImages (str.subject.images.large)" alt="" @click="rg(str.subject.id)">
                    </div>
                    <span>{{str.subject.title}}</span>
                    <star :score="str.subject.rating.average"></star>
                    <span v-if="str.subject.rating.average === 0">暂无评分</span>
                    <span v-else>{{str.subject.rating.average}}分</span>
                </li>
            </ul>
            <ul class="m-item">
                <span class="title">北美票房榜 · · · · · ·</span>
                <li v-for="(str,index) in listImg.data" :key="index">
                    <a href="javascript:void(0)" @click="rg(str.subject.id)"><span>{{index+1}}.{{str.subject.title}}</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import star from '../../components/star/star.vue'
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
  methods: {
    _initlistImg () {
      const _this = this
      const list = loadFromLocal()
      if (!list) {
        _this._getlistImg()
      }
      _this.listImg['data'] = list.listImg
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
    rg (index) {
      if (index) {
        axios.get('api/v2/movie/subject/' + index)
          .then((res) => {
            if (res.status === 200) {
              sessionStorage.setItem('movie_' + index, JSON.stringify(res.data))
              this.$router.push({name: 'cinecismInfo', params: {id: index}})
            }
          })
      }
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7)
        return 'https://images.weserv.nl/?url=' + _u
      }
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
                    width: 200px
                    text-align center
                    .m-img
                        display block
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
                    width: 165px
                    border-top: 1px dashed #ddd
                    span:hover
                        background-color : #a4beff

</style>
