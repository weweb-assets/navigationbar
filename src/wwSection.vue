<template>
    <component :is="tag" :class="{ sticky: isSticky }" v-show="show">
        <wwLayout path="wwObjects" class="navigation-bar"></wwLayout>
    </component>
</template>

<script>
import { getConfiguration } from './configuration';

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwManager: start */
        wwEditorState: Object,
        /* wwManager: end */
    },
    wwDefaultContent: {
        wwObjects: [],
        position: 'static',
        apparition: 'position',
        scrollPosition: 0,
        sectionId: null,
    },
    wwEditorConfiguration({ content }) {
        return getConfiguration(content);
    },
    data() {
        return {
            currentScrollPosition: 0, // current windows scroll
            sectionPosition: 0, // position of the section with this.sectionId if exists
            stickyPosition: 0, // scroll when element need to be sticky
        };
    },
    mounted() {
        // TODO: wrap with requestAnimationFrame // throttle
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
        this.onScroll();
        this.onResize();
    },
    computed: {
        tag() {
            return this.content.tag || 'div';
        },
        position() {
            /* wwManager: start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
                ? 'static'
                : this.content.position;
            /* wwManager: end */

            // eslint-disable-next-line no-unreachable
            return this.content.position;
        },
        isSticky() {
            if (this.position === 'fixed') return true;
            if (this.position === 'sticky') {
                return this.currentScrollPosition >= this.stickyPosition;
            }
            if (this.position === 'static') return false;

            return false;
        },
        appearScrollPosition() {
            if (this.position !== 'fixed') return 0;
            if (this.content.apparition === 'position') return this.content.scrollPosition;
            return this.sectionPosition;
        },
        show() {
            return this.appearScrollPosition <= this.currentScrollPosition;
        },
    },
    methods: {
        getElementPosition(el) {
            return el ? Math.max(0, el.offsetTop - window.innerHeight) : 0;
        },
        setSectionPosition() {
            if (!this.content.sectionId) {
                this.sectionPosition = 0;
                return;
            }
            const document = wwLib.getFrontDocument();
            const section = document.querySelector(`[data-section-uid="${this.content.sectionId}"]`);
            this.sectionPosition = this.getElementPosition(section);
        },
        setStickyPosition() {
            if (!this.$parent) {
                this.stickyPosition = 0;
                return;
            }
            const { top } = this.$parent.$el.getBoundingClientRect();
            const document = wwLib.getFrontDocument();
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.stickyPosition = top + scrollTop;
        },
        onResize() {
            this.setSectionPosition();
            this.setStickyPosition();
        },
        onScroll() {
            this.currentScrollPosition = window.scrollY;
        },
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    },
    watch: {
        'content.sectionId'() {
            this.setSectionPosition();
        },
    },
};
</script>

<style lang="scss" scoped>
.sticky {
    position: fixed;
    top: 0;
    z-index: 10;
}
.navigation-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
</style>
