<template>
    <div id="comment">
        <div class="commentBox">
            <h3>评论汇总</h3>
            <p style="padding: 10px;" class="sum">
                <span v-if="sum.jq_count !== 0" style="background-color: #E9E5DF;font-size: 14px">电影剧情很棒<b style="font-size: 12px;color: red">{{sum.jq_count}}</b></span>
                <span v-if="sum.yy_count !== 0" style="background-color: #E9E5DF;font-size: 14px">演员演技炸裂<b style="font-size: 12px;color: red">{{sum.yy_count}}</b></span>
                <span v-if="sum.tx_count !== 0" style="background-color: #E9E5DF;font-size: 14px">特效酷炫<b style="font-size: 12px;color: red">{{sum.tx_count}}</b></span>
            </p>
            <h3>评论</h3>
            <p v-if="comment.length==0" style="margin-left: 20px">暂无评论，我来发表第一篇评论！</p>
            <div v-else>
                <div class="comment" v-for="(item,index) in comment" :key="index">
                    <div v-if="item.to_uid == 0">
                        <b @click="changCommmer(item.uname,item.uid)">{{item.uname}}<span>评论此电影：{{item.content}}</span></b>
                        <p style="text-indent: 4em; font-size: 12px">时间：{{item.createtime}}</p>
                    </div>
                    <div v-else  class="reply">
                                <b><div @click="changCommmer(item.uname,item.uid)">{{item.uname}}</div><span>回复：</span>{{item.to_uname}}<span>{{item.content}}</span></b>
                                <p class="time">时间：{{item.createtime}}</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="commentBox">
            <h3>发表评论</h3>
            <div class="comment">
                <b v-if="type">你<span>：</span>@{{oldComment}}</b>
                <textarea name="" value="" v-model="commentText" placeholder="请填写评论的内容" required></textarea>
                <button class="btn" @click="addComment">发表</button>
                <button class="btn" @click="canelComment">取消</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import qs from 'qs'
import {getCookie} from '../../common/js/cookoie.js'
export default {
  data () {
    return {
      commentText: '',
      commenter: 'session',
      type: 0,
      oldComment: null,
      to_uid: ''
    }
  },
  created () {
    console.log(this.comment)
  },
  props: ['comment', 'id', 'sum'],
  methods: {
    addComment () {
      const _this = this
      if (_this.commentText) {
        if (this.type === 0) {
          axios.post('http://localhost:8088/video/index.php?g=Video&m=users&a=addComment', qs.stringify({
            type: _this.type,
            video_id: _this.id,
            uid: getCookie('uid'),
            uname: getCookie('uname'),
            content: _this.commentText
          }), {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }})
            .then((res) => {
              if (res.data.success === true) {
                this.$nextTick(() => {
                  _this.comment.push(res.data.response)
                  _this.commentText = ''
                  _this.$emit('refreshList')
                })
              } else {
                alert(res.data.info)
              }
            })
        } else if (this.type === 1) {
          axios.post('http://localhost:8088/video/index.php?g=Video&m=users&a=addComment', qs.stringify({
            type: _this.type,
            video_id: _this.id,
            uid: getCookie('uid'),
            uname: getCookie('uname'),
            to_uid: _this.to_uid,
            to_uname: _this.oldComment,
            content: _this.commentText
          }), {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }})
            .then((res) => {
              if (res.data.success === true) {
                this.$nextTick(() => {
                  _this.comment.push(res.data.response)
                  _this.commentText = ''
                  _this.$emit('refreshList')
                })
              } else {
                alert(res.data.info)
              }
            })
          this.type = 0
        }
      } else {
        alert('评论内容不许为空！')
      }
    },
    changCommmer (name, index) {
      this.oldComment = name
      this.to_uid = index
      this.type = 1
    },
    canelComment () {
      this.commentText = '请填写评论内容!'
      this.oldComment = null
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #comment
        width: 100%
        height: auto
        position: relative
        border: 1px solid red
        margin: 20px 0
        .commentBox
            margin: 20px
            h3
                color: #634322
                background: #e9e5df
                padding: 8px 15px
                text-align: left
                font-size: 16px
            .sum
                span
                    margin-left: 20px
            textarea
                overflow: auto
                width: 60%
                height: 95px
                outline: none
                resize: none
                display :block
            button
                position:relative
                top: 10px
                left: 405px
                margin-left: 20px
                padding: 5px 30px
                background: #01553D
                border-radius: 5px
                color: #fff
                font-size: 16px
            button:hover
                color: #fff
                background: #047857
            .noComment
                display: none
            .comment
                margin-bottom: 15px
            .comment + .comment, .reply + .reply
                border-top: 1px solid #ccc
            .comment
                b
                    color: #01553D
                    font-size: 16px
                    display: block
                    margin: 5px 0
                    text-indent 2em
                    div
                        display inline
                    span
                        color: #333;
                        font-size: 14px
                        margin-left: 20px
                p
                    font-size: 16px
                    color: #333
                    text-indent 2em

            .reply
                margin: 15px 0 15px 50px
                .time
                    font-size: 12px
                    text-indent :4em

</style>
