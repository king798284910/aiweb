<template>
    <div class='asideTemplate'>
        <ul class='aside_nav clearfix'>
            <li v-for='item in litext'>
                <router-link :to="item.path" :title="item.text">{{item.text}}</router-link>
            </li>
        </ul>
        <div class='tuijianImg'>
            <ul>
                <li v-for='item in asideData.latest'>
                    <router-link class='itemLiA' :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
        <div class='jishutantao'>
            <h2><router-link :to="'/'">技术探讨</router-link></h2>
            <ul class='rank'>
                <li v-for='item in asideData.technology' >
                    <router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title">{{item.title}}</router-link>
                </li>
            </ul>
            <h2><router-link :to="'/'">点击排行</router-link></h2>
            <ul class='rank'>
                <li v-for='item in asideData.hotBlog' >
                    <router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'aside',
        data() {
            return {
                litext: [
                    {
                        'text': 'H5/C3',
                        'path': '/web'
                    },
                     {
                        'text': 'IT资讯',
                        'path': '/itnews'
                    },
                    {
                        'text': '心得笔记',
                        'path': '/notes'
                    },
                    {
                        'text': '分享心情',
                        'path': '/share'
                    },
                ],
            }
        },
        computed:{
            asideData(){
                return this.$store.state.asideData
            },
        },
    }
</script>

<style scoped>
    .asideTemplate{
        width: 270px;
    }
    .aside_nav{
        width: 100%;
        padding: 15px;
        background: rgba(255,255,255,0.5);
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 0 10px #ccc;
    }
    .aside_nav li{
        width: 110px;
        height: 50px;
        float: left;
        border-radius: 4px;
    }
    .aside_nav li:nth-child(1){
        margin-right: 18px;
        margin-bottom: 15px;
        background: #ff7bad;
    }
    .aside_nav li:nth-child(2){
        
        background: #ffc000;
    }
    .aside_nav li:nth-child(3){
        margin-right: 18px;
        background: #f000ff;
    }
    .aside_nav li:nth-child(4){
        background: #ff0078;
    }
    .aside_nav li a{
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 50px;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        transition: all 1s;
    }
    .aside_nav li a:hover{
        background: rgba(255,255,255,0.5);
        transform: rotateZ(360deg);
    }
    .tuijianImg{
        margin-top: 15px;
        width: 100%;
        padding-top: 80px;
        background: url('../../assets/img/hot-recommend-img.png') rgba(255,255,255,0.4) no-repeat;
        background-position: 0px -50px;
        background-size: 270px;
        border-radius: 4px;
        box-shadow: 0 0 10px #ccc;
    }
    .tuijianImg ul {
        list-style-type: none;
        background: url(../../assets/img/libg.png) 0 -392px no-repeat;
        margin-left:8px;
    }
    .tuijianImg li .itemLiA {
        display:block;
        color: #ef7000;
        padding-left: 30px;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 36px;
        height: 36px;
        overflow: hidden;
        font-size: 14px;
    }
    .tuijianImg li .itemLiA:hover{
        color:#ef3900;
        text-decoration:underline;
    }
    .jishutantao{
        
    }
    .jishutantao h2 {
        color: #FFF;
        background: #f16e50;
        line-height: 36px;
        font-size: 12px;
        font-weight: normal;
        padding: 0 0 0 15px;
        height: 36px;
        margin-top: 15px;
        border-radius:4px 4px 0 0;
        box-shadow: 0 0 10px #ccc;
    }
    .jishutantao h2 a {
        color: #FFF;
    }
    .jishutantao ul {
        padding-left: 28px;
        background: url(../../assets/img/hot_title_bg.gif) 8px 8px rgba(255,255,255,0.4) no-repeat;
        border-radius:0 0 4px 4px;
        box-shadow: 0 0 10px #ccc;
    }
    .jishutantao ul li {
        line-height: 31px;
        clear: both;
        padding-left: 5px;
    }
    .jishutantao ul li a{
        font-size: 14px;
        display: block;
        color: #ef7000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .jishutantao ul li a:hover{
        color:#ef3900;
        text-decoration:underline;
    }
</style>