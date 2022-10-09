export const imageOptions: imageOpt[] = [
    {
        name: 'paris.jpeg',
        options: ['panama', 'chicago', 'jerusalem', 'paris'],
        answer: 'paris'
    },
    {
        name: 'paris.jpeg',
        options: ['panama2', 'paris', 'chicago2', 'jerusalem'],
        answer: 'paris'
    }
]

export type imageOpt = { name: string, options: string[], answer: string }