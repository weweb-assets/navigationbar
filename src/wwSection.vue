<template>
    <component :is="tag" class="navigation-bar" :class="{ [content.animation]: true, 'show': show, sticky: isSticky }">
        <wwLayout path="wwObjects" class="content"></wwLayout>
    </component>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    data() {
        return {
            currentScrollPosition: 0, // current windows scroll
            sectionPosition: 0, // position of the section with this.sectionId if exists
            stickyPosition: 0, // scroll when element need to be sticky
        };
    },
    computed: {
        tag() {
            return this.content.tag || 'div';
        },
        position() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
                ? 'static'
                : this.content.position;
            /* wwEditor:end */
            /* wwFront:start */
            // eslint-disable-next-line no-unreachable
            return this.content.position;
            /* wwFront:end */
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
    watch: {
        'content.sectionId'() {
            this.setSectionPosition();
        },
    },
    mounted() {
        // TODO: wrap with requestAnimationFrame // throttle
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
        this.onScroll();
        this.onResize();
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
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
};
</script>

<style lang="scss" scoped>
.navigation-bar {
    opacity: 0;
    pointer-events: none;

    & .content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    &.show {
        opacity: 1;
        pointer-events: all;
    }

        
    &.slide-top { 
        transition: transform 0.5s ease;
        transform: translateY(-100%);

        &.show {
            transform: translateY(0);
        }
    }

    &.sticky {
        position: fixed;
        top: 0;
        z-index: 10;
        transition: 0.5s ease;
    }
}

</style>
