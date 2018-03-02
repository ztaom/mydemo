<template>
    <section>
        <header class="top_tips">
            <span class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
            <span class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
        </header>
        <div v-if="fatherComponent == 'home'" >
            <div class="home_logo item_container_style"></div>
            <router-link to="item" class="start button_style" ></router-link>
        </div>
        <div v-if="fatherComponent == 'item'" >
            <div class="item_back item_container_style">
                <div class="item_list_container" v-if="itemDetail.length > 0">
                    <header class="item_title">{{itemDetail[itemNum-1].topic_name}}</header>
                    <ul>
                        <li  v-for="(item, index) in itemDetail[itemNum-1].topic_answer" @click="choosed(index, item.topic_answer_id)" class="item_list">
                            <span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
                            <span class="option_detail">{{item.answer_name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
            <span class="submit_item button_style" v-else @click="submitAnswer"></span>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'itemcontainer',
    data() {
        return {
            itemId: null, //题目ID
            choosedNum: null, //选中答案索引
            choosedId:null //选中答案id
        };
    },
    props:['fatherComponent'],
    computed: mapState([
        'itemNum', //第几题
        'level', //第几周
        'itemDetail', //题目详情
        'timer', //计时器
    ]),
    methods: {
        ...mapActions([
            'addNum', 'initializeData',
        ]),
        //点击下一题
        nextItem () {
            if (this.choosedNum !== null) {
                this.choosedNum = null;
                //保存答案, 题目索引加一，跳到下一题
                this.addNum(this.choosedId);
            } else {
                alert('您还没有选择答案哦');
            }
        },
        //索引0-3对应答案A-B
        chooseType: type => {
            switch (type) {
                default : return 'error';
                case 0: return 'A';
                case 1: return 'B';
                case 2: return 'C';
                case 3: return 'D';
            }
        },
        //选中的答案信息
        choosed (type, id) {
            this.choosedNum = type;
            this.choosedId = id;
        },
        //到达最后一题，交卷，请空定时器，跳转分数页面
        submitAnswer () {
            if (this.choosedNum !== null) {
                this.addNum(this.choosedId);
                clearInterval(this.timer);
                this.$router.push('score');
            } else {
                alert('您还没有选择答案哦');
            }
        },
    },
    created () {
        //初始化信息
        this.initializeData();
        document.body.style.backgroundImage = '';
    }
};
</script>