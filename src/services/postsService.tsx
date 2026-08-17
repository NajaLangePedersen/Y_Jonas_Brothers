import type {PostsItem, Root} from "../types/posts";
import type {User} from "@/types/users.tsx";

export async function fetchPosts(): Promise<PostsItem[]> {
    const res = await fetch("https://dummyjson.com/posts").then(r => r.json());
    const userRes = await fetch("https://dummyjson.com/users").then(r => r.json());

    const usersMap = new Map(userRes.users.map((u: User) => [u.id, u]));


    return res.posts.map((p: PostsItem) => ({
        ...p,
        user: usersMap.get(p.userId)
    }));
}


