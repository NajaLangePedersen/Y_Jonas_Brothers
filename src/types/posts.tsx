export interface Reactions {
    likes: number
    dislikes: number
}

export interface PostsItem {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

export interface Root {
    posts: PostsItem[]
    total: number
    skip: number
    limit: number
}