import { Parameters } from '@storybook/addons'

export const parameters: Parameters = {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'white',
        values: [
            {
                name: 'white',
                value: '#f4f4f4',
            },
            {
                name: 'black',
                value: '#333',
            },
        ],
    },
}
