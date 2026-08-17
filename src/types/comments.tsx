import type {User} from "@/types/users.tsx";

export interface CommentRoot {
    comments: Comment[]
    total: number
    skip: number
    limit: number
}

export interface Comment {
    id: number
    body: string
    postId: number
    likes: number
    user: User
}

