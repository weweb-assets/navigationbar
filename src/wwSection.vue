<template>
    <wwLayout path="wwObjects" class="navigation-bar"></wwLayout>
</template>

<script>
export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
    },
    wwDefaultContent: {
        wwObjects: [],
    },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
</style>
