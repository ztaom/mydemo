<script>
import CardList from './cardList';
import VideoPrize from './videoPrize';

export default {
    name: 'list',
    components: {
        'page-cardlist': CardList,
        'page-videoprize': VideoPrize,
    },
    render(createElement) {
        if (this.$store.state.initData) {
            const templateArr = [
                createElement('page-cardlist'),
                createElement('page-videoprize'),
            ];
            return createElement('div', templateArr);
        }
    }
};

</script>
