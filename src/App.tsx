
import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";
import {fetchPosts} from "@/services/postsService.tsx";

export function App() {

    const [posts, setPosts] = useState<PostsItem[]>([])

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    return (

    <div>
        {
            posts.map(p => {
                return <PostComponent key={p.id} postsItem={p} user={p.user} />
            })
        }
    </div>
  );
}
export default App;
