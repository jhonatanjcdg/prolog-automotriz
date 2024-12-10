import { join } from 'path';
import { fileURLToPath } from 'url';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        // Corrección: usar .then() para manejar la promesa
        import.meta.resolve('@skeletonlabs/skeleton').then(modulePath => 
            join(modulePath, '../**/*.{html,js,svelte,ts}')
        )
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