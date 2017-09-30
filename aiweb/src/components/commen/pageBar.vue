<template>
    <div class="page-bar">
        <ul>
            <span class='all'>{{all}}</span>
            <li v-if="showFirst" @click='preFirst' class='btnPage'>«</li>
            <li v-if="showFirst" @click="pre" class='btnPage mgr'>‹</li>
            <li v-for="index in indexs" @click="btnClick(index)" :class="{ 'active': cur == index}" class='pageCbtn'>
                {{ index }}
                <span class='pageImgBox' v-if='cur == index && imgShow'>
                    <img class='pageImg' :src='pageImg' />
                </span>
            </li>
            <li v-if="showLast" @click="next" class='btnPage mgl'>›</li>
            <li v-if="showLast" @click="nextLast" class='btnPage'>»</li>
        </ul>
    </div>

</template>

<script>
    import store from '../../vuex';
    export default {
        name: 'pageBar',
        data() {
            return {
                cur:1,
                pageImg:require("../../assets/img/loading.gif"),
            }
        },
        props:{
            all:{
                type:Number,
                default:1, //总页数
            },
            pCur:{
                type:Number,
                default:1,//当前页码
            },
            imgflag:{
                type:Boolean,
                default:false,//加载中图标
            }
        },
        watch:{
            pCur(){
                this.cur = this.pCur
            }
        },
        methods:{
            preFirst(){
                if(this.cur != 1){
                    this.cur = 1
                    this.$emit('pPage',this.cur);
                }
            },
            pre(){
                if(this.cur != 1){
                    this.cur --;
                    this.$emit('pPage',this.cur);
                }
            },
            btnClick(data){
                if(data != this.cur){
                    this.cur = data;
                    this.$emit('pPage',this.cur);
                }
            },
            next(){
                if(this.cur != this.all){
                    this.cur ++;
                    this.$emit('pPage',this.cur);
                }
            },
            nextLast(){
                if(this.cur != this.all){
                    this.cur = this.all;
                    this.$emit('pPage',this.cur);
                }
            },
        },
        computed:{
            imgShow(){
                
                return this.imgflag
            },
            showFirst(){
                if(this.cur == 1){
                    return false
                }
                return true
            },
            showLast(){
                if(this.cur == this.all){
                    return false
                }
                return true
            },
            indexs(){
                var left = 1
                var right = this.all
                var ar = []
                if(this.all>= 6){
                    if(this.cur > 3 && this.cur < this.all-2){
                            left = this.cur - 2
                            right = this.cur + 2
                    }else{
                        if(this.cur<=3){
                            left = 1
                            right = 5
                        }else{
                            right = this.all
                            left = this.all -4
                        }
                    }
                }
                while (left <= right){
                    ar.push(left)
                    left ++
                }
                return ar
            }
        },
        mounted(){

        },

    }
</script>
<style scoped>
    .page-bar {
        position: relative;
        height: 30px;
        text-align: center;
        user-select: none;
        margin-top: 30px;
        
    }
    .page-bar ul{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .all{
        margin-right: 10px;
    }
    .all,.page-bar li{
        float: left;
        display: inline-block;
        height: 22px;
        min-width:22px;
        border-radius: 15px;
        padding: 2px 5px;
        border:2px solid rgba(255,255,255,0.5);
        background: rgba(255,255,255,0.5);
    }
    .page-bar li{
        min-width:16px;
        font-size: 12px;
        line-height: 23px;
        cursor: pointer;
        position:relative;
        color:#000;
        overflow:hidden;
        transition: all 0.5s;
    }
    .page-bar li.pageCbtn:hover,.page-bar li.pageCbtn.active{
        border:2px solid #ff7bad;
        background: rgba(255,255,255,0.8);
        color:#ef3900;
        text-decoration:underline;
        font-weight: bold;
    }
    .page-bar .btnPage:hover{
        border:2px solid #ff7bad;
        background: rgba(255,255,255,0.8);
        color:#ef3900;
    }
    .page-bar .btnPage{
        font-size: 24px;
        line-height: 20px;
    }
    .page-bar .btnPage.mgr{
        margin-right: 8px;
    }
    .page-bar .btnPage.mgl{
        margin-left: 8px;
    }
    .pageImgBox{
        display:inline-block;
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
    }
    .pageImg{
        width:26px;
        height:100%;
    }
</style>