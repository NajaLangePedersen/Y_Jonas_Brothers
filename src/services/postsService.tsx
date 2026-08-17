import type {PostsItem, Root} from "../types/posts";
import type {User} from "@/types/users.tsx";

export async function fetchPosts(): Promise<PostsItem[]> {
    const res = await fetch("https://dummyjson.com/posts").then(r => r.json());
    const userRes = await fetch("https://dummyjson.com/users").then(r => r.json());

    const usersMap = new Map(userRes.users.map((u: User) => [u.id, u]));


    const postsWithUsers = await Promise.all(
        res.posts.map(async (p: PostsItem) => {
            const commentsRes = await fetch(`https://dummyjson.com/comments/post/${p.id}`).
            then(r => r.json());

            return {
                ...p,
                user: usersMap.get(p.userId),
                commentsCount: commentsRes.total
            };
        })
    );

    return postsWithUsers;
}


