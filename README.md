# Vue-video
##**Vue电影信息影评网站** ## https://segmentfault.com/a/1190000015311803

  此网站是我的毕业设计，题目是“基于HTML5的电影信息汇总弄网站”，由于最近在看Vue.js,所以就想用Vue.js来构建一个前端网站，这里code就不大篇幅的写了，主要讲一下网站的功能和所用到的技术栈，大家如果有问题的话可以去 [GitHub代码网址][1]上查看或者在下方留言。
    **技术栈**： Vue.js+ThinkPHP+MySql+Vue-router+Node.js
  网站主要功能分为：

**电影展示**
 主要是从第三方平台拉取电影信息，然后进行图片和电影名字展示还有轮播展示。展示分为*正在热映、北美票房榜、Top25*等三个板块，其中正在热映的数据来自**猫眼**，其余的均来自**豆瓣电影**。界面如下图：
![图片描述][2]
    
----------


**电影详情展示**

    此功能是提供电影详情的界面，包括演员、上映时间、导员、剧情简介、宣传视频（宣传视频由于豆瓣官方的API限制无法获取，所以只有正在热映板块-从猫眼获取的电影信息才有）。界面如下图：
![电影详情][3]
    
----------

**在线购票（基于猫眼第三方平台）**

    在线购票是基于第三方平台猫眼实现的，通过对应的电影id实现在线购票。界面如下图：
![在线购票][4]
    （仅限于最近正在热映的电影，其它的电影大家可以在网上观看）


----------


**在线评论**

    开发这个版块的目的是为了给电影爱好者提供一个互相交流的平台，从而也可以增加用户对网站的粘性。界面如下图：
![电影评论][5]


----------


    
**遇到的问题及解决方法**
    此网站的北美票房榜和top25的数据都是来自于豆瓣开发者开放平台提供给开发者的一些API，但是这些API并没有完全交给开发者，而是对其中的一些API做了限制


----------


 **1 数据请求权限**

　　在API中指出，豆瓣将用户的使用权限分成了3类，分别是公开、高级、商务，对于个人开发只能使用公开，公开的使用条件是：所有开发者均可申请，审核用过。限定40次请求/分钟。其实这个请求数据正常情况下是可以使用的。但是在开发过程中，发现当请求次数超过这个次数后，豆瓣会将开发者的ip封锁，导致无法请求，为了避免这种情况发生，本网站使用了HTML5新提供的本地存储数据方法sessionStorage。在首次打开网站后，将对应模块的数据信息存储的sessionStorage中，当本地存储中有对应的数据，则从本地存储读取，反之访问对应的API获取数据。


----------


**2 图片资源加载**
　　　在开发过程中，我发现从API中获取的图片资源无法正常在网站页面中进行渲染。通过百度发现，豆瓣在图片资源上做了防盗链，图片服务器通过检查条用该图片的是那个网址，如果不是它允许的，就不给显示，防止盗图。同过图片缓存网站https://images.weserv.nl/#quick-reference即可解决豆瓣图片无法渲染的问题。


----------


**3 axios组件**
　　　axios是一个基于Promise开发的应用组件，是为浏览器和Node.js设计开发的HTTP客户端请求组件。它封装了和HTTP相关的大量操作，在Web App中使用起来非常的方便。Vue2.0官方建议不再使用vue-resource，转而代替的是使用axios组件进行HTTP操作开发。在使用get方法请求的过程中没有遇到问题，但是当请求方法为post是，请求数据出错，后台获取不到数据，但是通过浏览器开发者工具可以看到是有数据传输过去了。通过在网上收集各种弄资料，axios默认是通过Request Payload的形式传送了参数，而不是我们熟悉的form-data形式，故有以前获取form-data的方法获取不到，可以通过借助于第三方开源qs库为数据格式化。代码如下：

   

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
                        })
                      } else {
                        alert(res.data.info)
                      }
                    })

**备注**
参考网站：

 1. [猫眼数据API][6]
 2. [豆瓣电影API][7]


----------
如有任何版权问题，请及时联系本人或留言，将会在第一时间进行处理


  [1]: https://github.com/LaughingZhu/Vue-video
  [2]: /img/bVbcply
  [3]: /img/bVbcpmJ
  [4]: /img/bVbcpor
  [5]: /img/bVbcpqT
  [6]: https://www.jianshu.com/p/9855610eb1d4
  [7]: https://developers.douban.com/wiki/?title=api_v2
