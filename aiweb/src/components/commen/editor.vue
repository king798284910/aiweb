<template>
    <div class="wrapper">
    	<v-tips :pData = 'tipsData'></v-tips>
    	<v-layer :pLayerData = 'layerData' @queren= 'queren'></v-layer>
        <main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
            <v-crumbs :Rlist='Rlist'></v-crumbs>
            <div class='inputBox'>
                <span class='pTitle'>文章标题</span>
                <input type="text" v-model="articleTitle">
            </div>
            <div class='textareaBox'>
                <span class='pTitle1'>内容概览</span>
                <textarea v-model="articleOverview"></textarea>
                <div class='imgBox'><img :src="articleImg"><span class='tips_' v-if='tipsContent.length>0'>{{tipsContent}}</span></div>
            </div>
            <ul class='inputBox'>
                <li><input type="radio" value = '{"text":"C3/H5","Vpath":"/web"}' v-model="articleLabel"><i>C3/H5</i></li>
                <li><input type="radio" value = '{"text":"it资讯","Vpath":"/itnews"}' v-model="articleLabel"><i>it资讯</i></li>
                <li><input type="radio" value = '{"text":"心得笔记","Vpath":"/notes"}' v-model="articleLabel"><i>心得笔记</i></li>
                <li><input type="radio" value = '{"text":"网站运营","Vpath":"/operation"}' v-model="articleLabel"><i>网站运营</i></li>
                <div @click='articlePreview' class='articlePreview'>预览</div>
                <div @click='shareUploadFlag && uploadShare()' class='uploadShare' >
                提交简说
                <span class='loading_'  v-show='!shareUploadFlag'></span>
                </div>
                <li><input type="file" @change="articleImgFn($event)"><i>上传图片</i></li>

            </ul>
            <div id="editorElem" style="text-align:left"></div>
            <div class='previewBox' v-show='previewData.articleTitle!=""'>
            	<p class="previewT">预览</p>
                <span class='previewBoxClose' @click='close_'>×</span>
                <div class="articleList">
                     <ul class='l-article'>
                        <li>
                            <h2><router-link :to="previewData.articleLabel.Vpath +'/'+ previewData.id" class='textTitleA vueA' :title="previewData.articleTitle"  >{{previewData.articleTitle}}</router-link></h2>
                            <router-link :to="'/web/16036'" :title="previewData.articleTitle" rel="bookmark" class="a-pic-link vueA">
                                <img :src="previewData.articleImg" :alt="previewData.articleTitle" :title="previewData.articleTitle" class="a-pic l">
                            </router-link>
                            <div class="a-con">
                                <p>{{previewData.articleOverview}}</p>
                                <router-link :to="previewData.articleLabel.Vpath +'/'+ previewData.id" :title="previewData.articleTitle"  class="a-more vueA" >阅读全文&gt;&gt;</router-link>
                            </div>
                            <p class='autor'>
                                <span class='paddings textTime'>2017-09-01 18:26:54</span>
                                <span class='paddings fenlei'>[<router-link :to="previewData.articleLabel.Vpath" :title="previewData.articleLabel.text"  class="fenleiA vueA" >{{previewData.articleLabel.text}}</router-link>]</span>
                                <span class='paddings liulan'>浏览(666)</span>
                                <span class='paddings author'>金理学</span>
                            </p>
                        </li>

                    </ul> 
                </div>
                <div class="articleText" >
                	<div class='articleDatail'>
                		<h2>{{previewData.articleTitle}}</h2>
                		<p class='autor'>
                            <span class='paddings textTime'>2017-09-01 18:26:54</span>
                            <span class='paddings fenlei'>[<router-link :to="previewData.articleLabel.Vpath" :title="previewData.articleLabel.text"  class="fenleiA vueA" >{{previewData.articleLabel.text}}</router-link>]</span>
                            <span class='paddings liulan'>浏览(666)</span>
                            <span class='paddings author'>金理学</span>
                        </p>
                		<div v-html='editorContent' v-highlight></div>
                	</div>
                </div>
            </div>
            <div @click='atcUploadFlag && uploadArticle()' class='upload'>
            提交文章
            <span class='loading_' v-show='!atcUploadFlag'></span>
            </div>
        </main>
        
    </div>
</template>

<script>
    import store from '../../vuex';
    import vCrumbs from './crumbs.vue';
    import vTips from './tips.vue';
    import vLayer from './layer.vue';
    import E from 'wangeditor';
    import axios from 'axios'
    export default {
        name: 'editor',
        data() {
            return {
                Rlist:[],//面包屑导航
                editorObj:null,
                //articleImgUrl:'',//图片预览路径
                articleTitle:'',//文章标题
                articleOverview:'',//文章概览
                articleImg:'',//文章概览图
                articleLabel:'',//文章标签
                editorContent: '',//文章内容
                tipsContent:'',//提示信息
                previewData:{
                	articleTitle:"",
                	articleOverview:'',
                	articleImg:'',
                	articleLabel:{
                		"text":'',
                		"Vpath":''
                	},
                	id:''
                },//预览的信息
                tipsData:{
                	ifShow:false,
                },//提示信息
                layerData:{
                	ifShow:false,
                },//弹窗信息
                tijiaoleix:null,//提交的类型
                atcUploadFlag:true,
                shareUploadFlag:true,
                imgArr:[],
            }
        },
        components:{
            vCrumbs,
            vTips,
            vLayer
        },
        computed:{
            asideMoveIn(){
                return this.$store.state.asideMoveFlag
            },
        },
        mounted(){
            var self = this;
            self.editorObj = new E('#editorElem');
            self.editorObj.customConfig.uploadImgServer = '/api/imgupload';  // 上传图片到服务器
            self.editorObj.customConfig.uploadFileName = 'imgName';
            self.editorObj.customConfig.customAlert = function (info) {
                // info 是需要提示的内容
                self.tipsData={
                    ifShow:true,
                    textColor:'red',
                    centent:info,
                }
            };
            self.editorObj.customConfig.uploadImgHooks = {
                success: function (xhr, editor, result) {
                    var reg0 = new RegExp("/images([^<>]*?)\.(gif|png|jpg|jpeg|bmp)", "ig");
                    var imgurl_ = result.data[0].match(reg0)[0];
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    self.imgArr.push(imgurl_);
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    if(result.errno == -3){
                        sessionStorage.removeItem("login");
                        self.$store.commit('changeLoginBoxFlag',true);
                    }
                },
            };
            self.editorObj.create();
        },
        activated(){
            var self = this;
            self.$store.commit('changeAsideF');
            self.$store.commit('changeMoveT');
        },
        methods:{
            articleImgFn(e){
                var file = e.target.files[0];
                let self = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) {
                    self.tipsContent = '浏览器版本过低!'
                    return;
                }

                if (/^image/.test(file.type)) {
                    self.tipsContent = '';//清空提示信息
                    // 创建一个reader
                    var reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        //self.articleImgUrl = this.result;
                        self.articleImg = this.result;
                    }
                }else{
                    self.tipsContent = '图片格式错误！'
                }
            },
            articlePreview(){
            	
                let articleLabel = JSON.parse(this.articleLabel==''?'{"text":"C3/H5","Vpath":"/web"}':this.articleLabel);
                this.previewData = {articleTitle:this.articleTitle,
                            articleOverview:this.articleOverview,
                            articleImg:this.articleImg,
                            articleLabel:articleLabel,
                            editorContent:this.editorObj.txt.html(),
                            id:Math.floor(Math.random()*9000) + 1000,
                        }
                this.editorContent = this.editorObj.txt.html();
            },//获取文章内容并预览
            uploadArticle(){
            	
				if(this.articleTitle == ''){
            		this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'文章标题为空！',
                	}
                	return
                }else if(this.articleOverview == ''){
            		this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'文章概览为空！',
                	}
                	return
                }else if(this.articleImg == ''){
                	this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'文章概览图为空！',
                	}
                	return
            	}else if(this.articleLabel == ''){
                	this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'文章标签为空！',
                	}
                	return
            	}else if(this.editorObj.txt.html() == '<p><br></p>'){
                	this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'文章内容为空！',
                	}
                	return
            	}else{
            		this.layerData = {
	                	ifShow:true,
	                	title:'提交文章',
	                	centent:'确定提交文章吗？',
	                }
            		this.tijiaoleix = 'article';
            	}
            },
            uploadShare(){
            	if(this.articleOverview == ''){
            		this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'简说内容为空！',
                	}
                	return
                }else if(this.articleImg == ''){
                	this.tipsData={
	                	ifShow:true,
                        textColor:'red',
	                	centent:'简说图片为空！',
                	}
                	return
            	}else{
            		this.layerData = {
	                	ifShow:true,
	                	title:'提交简说',
	                	centent:'确定提交简说吗？',
	                }
            		this.tijiaoleix = 'share';
            	}
            },
            close_(){
                this.previewData = {
                	articleTitle:"",
                	articleOverview:'',
                	articleImg:'',
                	articleLabel:{
                		"text":'',
                		"Vpath":''
                	},
                	id:''
                };
            },
            queren(){
            	if(this.tijiaoleix == 'share'){
                    this.shareUploadFlag = false;
                    let newData = {
                        content:this.articleOverview,
                        imgUrl:this.articleImg,
                    };
                    axios.post('/api/saveshare',newData )
                     .then(function (res) {
                        if(res.data.status>0){
                            this.$router.push('/share');
                        }
                        else if(res.data.status==0){
                            sessionStorage.removeItem("login");
                            this.$store.commit('changeLoginBoxFlag',true);
                        }else{
                            this.tipsData={
                                ifShow:true,
                                textColor:'red',
                                centent:res.data.msg,
                            }
                        }
                        this.shareUploadFlag = true;
                     }.bind(this))
                     .catch(function (error) {
                        this.tipsData={
                            ifShow:true,
                            textColor:'red',
                            centent:'提交失败',
                        }
                        this.shareUploadFlag = true;
                    }.bind(this));
            	};
            	if(this.tijiaoleix == 'article'){
                    this.atcUploadFlag = false;
                    let newData = {
                        title:this.articleTitle,
                        overview:this.articleOverview.slice(0,150),
                        imgUrl:this.articleImg,
                        label:this.articleLabel,
                        content:this.editorObj.txt.html(),
                        imgArr:this.imgArr,
                    };
                    axios.post('/api/savearticle',newData )
                     .then(function (res) {
                        if(res.data.status>0){
                            let articleLabel = JSON.parse(this.articleLabel);
                            this.$router.push(articleLabel.Vpath);
                        }else if(res.data.status==0){
                            sessionStorage.removeItem("login");
                            this.$store.commit('changeLoginBoxFlag',true);
                        }
                        else{
                            this.tipsData={
                                ifShow:true,
                                textColor:'red',
                                centent:res.data.msg,
                            }
                            this.imgArr = [];
                        }
                        this.atcUploadFlag = true;
                     }.bind(this))
                     .catch(function (error) {
                        this.tipsData={
                            ifShow:true,
                            textColor:'red',
                            centent:'提交失败',
                        }
                        this.atcUploadFlag = true;
                    }.bind(this));
            	}
            },
        },
        beforeRouteEnter (to, from, next) {
            store.commit('progressBarisOk');
            var value = sessionStorage.getItem("login")
            if (value) {
                store.commit('changeMoveF');
                next(vm => {
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/editor',text:'编辑'}
                    ]
                })
            } else {
                store.commit('changeLoginBoxFlag',true);
                next({
                    path:'/home'
                })
            }
        },
    }
</script>
<style scoped>
    
    .main {
        float: left;
        width: 1030px;
        color:#666;
    }
    #editorElem{
        width: 100%;
        margin-top: 20px;
        background: rgba(255, 255, 255, 0.5);
    }
    .eCheckBox{
        width: 80px;
        height: 40px;
        margin: 0;
        position: relative;
    }
    .inputBox{
        position: relative;
        height: 40px;
        width: 100%;
        margin-top: 20px;
    }
    .inputBox input[type=text]{
        height: 100%;
        width: calc(100% - 105px);
        font-size: 16px;
        padding: 0;
        float: right;
        border:1px solid #ccc;
        background: rgba(255, 255, 255, 0.5);
        box-sizing: border-box;
    }
    .pTitle{
        display: inline-block;
        width: 80px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background: rgba(255, 255, 255, 0.5);
    }
    .textareaBox{
        width: 100%;
        height: 100px;
        margin-top: 20px;
    }
    .textareaBox textarea{
        display: inline-block;
        height: 100px;
        width: calc(100% - 255px);
        font-size: 16px;
        padding: 0;
        float: left;
        border:1px solid #ccc;
        box-sizing: border-box;
        resize:none;
        background: rgba(255, 255, 255, 0.5);
    }
    .pTitle1{
        display: inline-block;
        width: 20px;
        height: 100px;
        text-align: center;
        line-height: 25px;
        padding:0 40px;
        float: left;
        margin-right: 5px;
        background: rgba(255, 255, 255, 0.5);
    }
    .imgBox{
        height: 100px;
        width: 145px;
        float: right;
        text-align: center;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.5);
    }
    .imgBox img{
        max-width: 100%;
        max-height: 100%;
    }.imgBox span{
        max-width: 100%;
        max-height: 100%;
    }
    .inputBox li{
        position: relative;
        display: inline-block;
        width: 80px;
        height: 40px;
        margin-right: 30px;
    }
    .inputBox li:last-child{
        float: right;
    }
    .inputBox input[type=radio],.inputBox input[type=file]{
        position: absolute;
        display: inline-block;
        width: 80px;
        height: 40px;
        z-index: 99;
        opacity: 0;
        margin: 0;
        cursor: pointer;
    }
    .inputBox i{
        position: absolute;
        display: inline-block;
        width: 80px;
        height: 40px;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 40px;
        background: rgba(255, 255, 255, 0.8);
        font-style: normal;
        border:1px solid rgba(255, 255, 255, 0.8);
        box-sizing: border-box;
        overflow: hidden;
    }
    .inputBox i:before{
        content: '';
        position: absolute;
        width: 40px;
        height: 6px;
        background: #db7093;
        visibility: hidden;
        transform: rotateZ(45deg);
        right: -10px;
    }
    .inputBox input[type=radio]:checked + i{
        border:1px solid #db7093;
        color:#db7093;
    }
    .inputBox input[type=radio]:checked + i:before{
        visibility: visible;
    }
    .articlePreview{
        width: 40px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        text-align: center;
        bottom: -50px;
        right: 10px;
        cursor: pointer;
    }
    .articlePreview:hover{
        color:#000;
    }
    .upload{
        width: 200px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 20px auto 0;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 5px;
        position: relative;
    }
    .upload:hover,.uploadShare:hover{
        background: rgba(255, 255, 255, 0.8);
    }
    .previewBox{
        width: 100%;
        margin-top: 20px;
        position: relative;
        box-shadow: 0 0 10px #ccc;
    }
    .previewBox > div{
        width: 745px;
        margin:20px auto 0;
    }
    .uploadShare{
        position: absolute;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        top: 0;
        right: 150px;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s;
        border-radius: 5px;
    }
    .previewBoxClose{
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 36px;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        position: absolute;
        border-radius: 50%;
        right: 0px;
        top: 0px;
    }
    .previewBoxClose:hover{
        color:#000;
    }
    .previewT{
    	height: 40px;
    	width: 100%;
    	background: rgba(255, 255, 255, 0.5);
    	padding-left: 20px;
    	line-height: 40px;
    	box-sizing: border-box;
    	border-radius: 3px;
    }
    /*.articleText{
    	
    }*/
    .loading_{
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        background: url('../../assets/img/loading.gif') center center #fff no-repeat;
        background-size: 40px;
        position: absolute;
        top: 0;
        left: 0;
        cursor: not-allowed;
    }
</style>