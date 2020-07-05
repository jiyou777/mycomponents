<template>
    <div class="component">
                <div class="imglist" :style="'width:'+(spacew+leftw*2+10)*col+'px;'+'height:'+(spaceh+leftw*2)*row+'px;'">
                    <div class="imglist-item" v-for="(item,index) in imglist" :key="index"
                         :style="'margin:'+ parseInt(leftw)+'px;'+'width:'+spacew+'px;'+'height:'+spaceh+'px;'">
                        <img :class="isshowpic?'imglist-item-img':'none'" v-if="isshowpic"
                             :style="'width:'+spacew+'px;'+'height:'+spaceh+'px;'" :src="item.imgurl" alt="">
                        <div :style="'font-size:'+fontsize+'px;height:'+fontheight+'px;line-height:'+fontheight+'px;'"
                             :class="isshowpic?'imglist-item-title':'imglist-item-title2'"
                             v-if="isshow">
                        </div>
                        <span :style="'height:'+fontheight+'px;line-height:'+fontheight+'px;'" v-if="isshow" class="imglist-item-title-span">{{item.label}}</span>
                    </div>
                </div>
    </div>
</template>
<script>
    import {VueExtend, Util} from 'godspen-lib'
    import {bind} from 'size-sensor'

    export default {
        mixins: [VueExtend.mixin],
        name: 'maliangeditor',
        label: process.env.LABEL,
        style: {width: "500px", height: "500px"},
        stack: false, // 是否是堆叠模式 ，true：孩子元素会按楼层一个个向下排布， false: 孩子元素绝对定位，随意放置位置
        childLimit: 9999,  // 孩子元素最大限制数
        leaf: false, // 是否是叶子节点，为true的时候该节点下面不能添加节点
        props: { // 设置该元素支持的属性配置
            area: {
                type: String,
                default: "默认",
                editer: {label: "区域", type: "enum", defaultList: ["区域1", "区域2", "区域3", "区域4"]}
            },
            terminal: {
                type: String,
                default: "默认",
                editer: {label: "终端", type: "enum", defaultList: ["终端1", "终端2"]}
            },
            isshow: {type: Boolean, default: true, editer: {label: "是否隐藏文字", type: "isshow"}},
            isshowpic: {type: Boolean, default: true, editer: {label: "切换文字/图片列表", type: "isshowpic"}},
            spacew: {
                type: Number,
                default: 150,
                editer: {
                    label: "宽",
                    type: "number"
                }
            },
            spaceh: {type: Number, default: 230, editer: {label: "高", type: "number"}},
            fontsize: {type: Number, default: 16, editer: {label: "字体大小", type: "number"}},
            leftw: {type: Number, default: 5, editer: {label: "元素之间的距离", type: "number"}},
            fontheight:{type: Number, default: 30, editer: {label: "文字元素高度", type: "number"}},
            col: {type: Number, default: 3, editer: {label: "列数", type: "number"}},
            row: {type: Number, default: 2, editer: {label: "行数", type: "number"}},
            imglist: {
                type: Array,
                editer: {
                    label: "none",
                    type: "newlist"
                },
                default: function () {
                    return [{
                        showimg: !1, label: "今年端午节为21世纪并列最晚", icourl: "", imgurl: "src/assets/1.jpg", imgid: 0,
                    }, {
                        showimg: !1, label: "北京施工工地发现确诊病例3人新", icourl: "", imgurl: "images/1.jpg", imgid: 1
                    }, {
                        showimg: !1, label: "仝卓 承蒙厚爱后会有期", icourl: "", imgurl: "images/1.jpg", imgid: 2
                    }, {showimg: !1, label: "今年端午节为21世纪并列最晚", icourl: "", imgurl: "images/1.jpg", imgid: 3}, {
                        showimg: !1, label: "北京施工工地发现确诊病例3人新", icourl: "", imgurl: "images/1.jpg", imgid: 4
                    }, {showimg: !1, label: "仝卓 承蒙厚爱后会有期", icourl: "", imgurl: "/images/1.jpg", imgid: 5},
                    ]
                },

            },
            all:{type: Number, default: 6, editer: {label: "none", type: "number"}},
        },
        computed: {},
        watch: {
            row(val) {
                console.log(val)
                console.log(this.col*this.row)
                var obj = {showimg: !1, label: "仝卓 承蒙厚爱后会有期", icourl: "", imgurl: "/images/1.jpg", imgid: 5}
                var le = this.col*this.row
                this.imglist.splice(0,this.imglist.length);
                var left = 200;
                var all  = 0
                for (var i =0; i<le; i++ ){


                    if((i)%this.col==0){
                        console.log("换行了")
                        all= 0
                        console.log(all)
                    }
                    all+= 200
                    console.log("第"+i+"个元素的left"+all)
                    this.imglist.push(obj)
                }

            }
        },
        mounted: async function () {

        },
        editorMethods: {},
        methods: {}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .component {
        // 为了适配组件在编辑器里面能按拖动大大小适配，建议一个组件的宽高就是 100% 100%。
        // 如果要设置拖动到编辑器里面的初始化样式，请到package.json 的style属性里面添加默认值
        width: 100%;
        height: 100%;
    }

    .imglist {
        width 500px;
        height 500px;
        padding-left 10px;
    }

    .imglist-item {
        width 150px;
        height 230px;
        float left;
        position relative;
    }

    .imglist-item-img {
        width 150px;
        height 230px;
    }

    .imglist-item-title {
        height 30px;
        line-height 30px;
        background #000000;
        color #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position absolute;
        bottom 0;
        left 0;
        right 0;
        opacity 0.6;
    }
    .imglist-item-title-span {
        height 30px;
        line-height 30px;
        color #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position absolute;
        bottom 0;
        left 0;
        right 0;
    }
    .imglist-item-title2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
