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
    },
    {
        category: 'Cars',
        name: 'mazda.png',
        options: ['Hyundai', 'Mercedes', 'Lexus', 'Mazda'],
        answer: 'Mazda'
    },
    {
        category: 'Apps',
        name: 'opera.png',
        options: ['Chrome', 'Netscape', 'Opera', 'Safari'],
        answer: 'Opera'
    },
    {
        category: 'Singers',
        name: 'moshe.jpeg',
        options: ['Eden Hason', 'Moshe Peretz', 'Omer Adam', 'Ivri Lider'],
        answer: 'Moshe Peretz'
    },
    {
        category: 'Logo',
        name: 'pepsi.jpeg',
        options: ['Starbucks', 'Twitter', 'Nike', 'Pepsi'],
        answer: 'Pepsi'
    },
    {
        category: 'Heroes',
        name: 'batman.jpeg',
        options: ['Superman', 'Cat woman', 'Batman', 'Hawkeye'],
        answer: 'Batman'
    },
    {
        category: 'Animals',
        name: 'koala.jpeg',
        options: ['Monkey', 'Mouse', 'Bear', 'koala'],
        answer: 'koala'
    }

]

export type imageOpt = { category: string, name: string, options: string[], answer: string }
