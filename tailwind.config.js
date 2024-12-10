(function() {
    const { join } = require('path');
    
    const forms = require('@tailwindcss/forms');
    const typography = require('@tailwindcss/typography');
    const { skeleton } = require('@skeletonlabs/tw-plugin');
    
    module.exports = {
        darkMode: 'class',
        content: [
            './src/**/*.{html,js,svelte,ts}',
            join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
        ],
        theme: {
            extend: {}
        },
        plugins: [
            forms,
            typography,
            skeleton({
                themes: {
                    preset: [
                        {
                            name: 'skeleton',
                            enhancements: false
                        }
                    ]
                }
            })
        ],
        darkMode: 'selector' 
    };
})();