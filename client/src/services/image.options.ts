export const imageOptions: imageOpt[] = [
    {
        category: 'Cities',
        name: 'paris.jpeg',
        options: ['Rome', 'Istanbul', 'Las vegas', 'Paris'],
        answer: 'Paris'
    },
    {
        category: 'Cities',
        name: 'moscow.jpeg',
        options: ['London', 'Moscow', 'Bangkok', 'Dubai'],
        answer: 'Moscow'
    },
    {
        category: 'Flags',
        name: 'dk-flag.jpeg',
        options: ['Denmark', 'Switzerland', 'Norway', 'England'],
        answer: 'Denmark'
    },
    {
        category: 'Actors',
        name: 'leonardo.jpeg',
        options: ['Michael J. Fox', 'Ben Affleck', 'Leonardo DiCaprio', 'Tobey Maguire'],
        answer: 'Leonardo DiCaprio'
    }
]

export type imageOpt = { category: string, name: string, options: string[], answer: string }
