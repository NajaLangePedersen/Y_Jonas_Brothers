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

export async function createPost(title: string, body: string, tags: string[], userId: number | null) {

    const finalUserId = userId ?? Math.floor(Math.random()*70) +31;

    const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body,
            tags: tags,
            userId: finalUserId
        })
    });

    return await res.json();
}

export async function deletePost(id: number){
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",
    })
    return await res.json();
}

export async function deleteComment(id: number) {
    const res = await fetch(`https://dummyjson.com/comments/${id}`, {
        method: "DELETE",
    });

    return await res.json();
}


