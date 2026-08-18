
import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";
import {fetchPosts} from "@/services/postsService.tsx";

export function App() {

    const [posts, setPosts] = useState<PostsItem[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    return (

    <div>
        <input
            placeholder={"Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{marginBottom: "5rem"}}
        />
        {
            posts
                .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
                .map(p => {
                return <PostComponent key={p.id} postsItem={p} user={p.user} />
            })
        }
    </div>
  );
}
export default App;
