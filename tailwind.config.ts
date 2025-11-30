import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/flowbite-react/lib/**/*.js',
    ],
    // plugins are handled in globals.css for Tailwind v4
};

export default config;
