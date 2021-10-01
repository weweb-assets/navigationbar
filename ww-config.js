export default {
    editor: {
        label: {
            en: 'Navigation bar'
        },
        icon: 'menu'
    },
    properties: {
        tag: {
            label: { en: 'Html tag' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'div', label: { en: 'div' } },
                    { value: 'section', label: { en: 'section' } },
                    { value: 'header', label: { en: 'header' } },
                    { value: 'nav', label: { en: 'nav' } },
                ],
            },
            defaultValue: 'div',
        },
        position: {
            label: { en: 'Position', fr: 'Position' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'static', label: { en: 'Static', fr: 'Statique' } },
                    { value: 'fixed', label: { en: 'Fixed', fr: 'Fix' } },
                    { value: 'sticky', label: { en: 'Sticky', fr: 'Sticky' } },
                ],
            },
            defaultValue: 'static',
        },
        apparition: {
            label: { en: 'Apparition', fr: 'Apparition' },
            type: 'TextSelect',
            hidden: content => content.position !== 'fixed',
            options: {
                options: [
                    { value: 'position', label: { en: 'At a specific position', fr: 'Position spécifique' } },
                    { value: 'section', label: { en: 'At a specific section', fr: 'Fix' } },
                ],
            },
            defaultValue: 'position',
        },
        animation: {
            label: { en: 'Animation', fr: 'Animation' },
            type: 'TextSelect',
            hidden: content => content.position !== 'fixed',
            options: {
                options: [
                    { value: 'none', default: true, label: { en: 'Appear' } },
                    { value: 'slide-top', label: { en: 'Slide from top' } },
                ],
            },
            defaultValue: 'none',
        },
        scrollPosition: {
            label: { en: 'Appear after scrolling' },
            type: 'Number',
            hidden: content => content.apparition !== 'position',
            options: content => ({
                disabled: content.position !== 'fixed',
            }),
            defaultValue: 0,
        },
        sectionId: {
            label: { en: 'Section' },
            type: 'Section',
            hidden: content => content.apparition !== 'section',
            options: content => ({
                disabled: content.position !== 'fixed' 
            }),
            defaultValue: null,
        },
        wwObjects: {
            hidden: true, 
            defaultValue: [],
        }
    }
}
