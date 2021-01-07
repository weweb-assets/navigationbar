export function getConfiguration(content) {
    const settingsOptions = [
        {
            label: { en: 'SEO' },
            fields: {
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
                },
            },
        },
        {
            label: { en: 'Disposition' },
            fields: {
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
                },
                apparition: {
                    label: { en: 'Apparition', fr: 'Apparition' },
                    type: 'TextSelect',
                    options: {
                        options: [
                            { value: 'position', label: { en: 'At a specific position', fr: 'Position spécifique' } },
                            { value: 'section', label: { en: 'At a specific section', fr: 'Fix' } },
                        ],
                        disabled: content.position !== 'fixed',
                    },
                },
                ...(content.apparition === 'position'
                    ? {
                          scrollPosition: {
                              label: { en: 'Appear after scrolling' },
                              type: 'Number',
                              options: {
                                  disabled: content.position !== 'fixed',
                              },
                          },
                      }
                    : null),
                ...(content.apparition === 'section'
                    ? {
                          sectionId: {
                              label: { en: 'Section' },
                              type: 'Section',
                              options: { disabled: content.position !== 'fixed' },
                          },
                      }
                    : null),
            },
        },
    ];

    return { settingsOptions };
}
