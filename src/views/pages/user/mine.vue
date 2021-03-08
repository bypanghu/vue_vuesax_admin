<template>
    <div>
        {{userInfo.name}}
    </div>
</template>

<script>
export default {
    name: 'mine',
    data() {
        return {
            userInfo : this.$store.state.user
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>