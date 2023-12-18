import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
} from 'unocss'

export default defineConfig({
    shortcuts: [
        [
            'btn',
            'px-4 py-1 min-w-100 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
            'icon-btn',
            'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none',
        ],
        [
            'action-btn',
            'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
            'secondary-btn',
            'px-4 py-1 rounded inline-block border-solid border-2 border-teal-600 bg-transparent text-teal-600 cursor-pointer hover:bg-teal-700 hover:text-white disabled:cursor-default disabled:border-gray-700 disabled:text-gray disabled:opacity-50',
        ],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
})
