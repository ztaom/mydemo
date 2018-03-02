<template>
    <div>
        <div class="your_scores_container">
            <header class="your_scores"><span class="score_num">{{score}}</span><span class="fenshu">分！</span></header>
            <div class="result_tip">{{scoreTips}}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
let _this = null;
export default {
    name: 'score',
    data() {
        return {
            showHide: false, //是否显示提示
            score: 0, //分数
            scoreTips:'', //分数提示
            rightAnswer: [2, 7, 12, 13, 18], //正确答案
            scoreTipsArr:['你说，是不是把知识都还给小学老师了？', '还不错，但还需要继续加油哦！', '不要嘚瑟还有进步的空间！', '智商离爆表只差一步了！', '你也太聪明啦，葡萄之家欢迎你！'],
        };
    },
    computed: {
        ...mapState({
            answerid: state => state.answser.answerid,
        }),
    },
    created(){
        _this = this;
        this.computedScore();
        this.getScoreTip();
    },
    methods: {
        //计算分数
        computedScore () {
            _this.answerid.forEach((item, index) => {
                if (item === _this.rightAnswer[index]) {
                    _this.score += 20;
                }
            });
        },

        //根据分数显示提示
        getScoreTip: () => {
            if (_this.score <= 20) {
                _this.scoreTips = _this.scoreTipsArr[0];
                return;
            }
            if (_this.score <= 40) {
                _this.scoreTips = _this.scoreTipsArr[1];
                return;
            }
            if (_this.score <= 60) {
                _this.scoreTips = _this.scoreTipsArr[2];
                return;
            }
            if (_this.score <= 80) {
                _this.scoreTips = _this.scoreTipsArr[3];
                return;
            }
            if (_this.score <= 100) {
                _this.scoreTips = _this.scoreTipsArr[4];
            }
        }
    },
};
</script>