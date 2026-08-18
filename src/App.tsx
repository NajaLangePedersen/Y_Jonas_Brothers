
import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";
import {fetchPosts, createPost} from "@/services/postsService.tsx";

export function App() {

    const [posts, setPosts] = useState<PostsItem[]>([])
    const [search, setSearch] = useState("")
    const [showPopup, setShowPopup] = useState(false)

    //useStates for elements to create new post
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const[tags, setTags] = useState("")

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
        <button onClick={() => setShowPopup(true)}>Create post</button>
        {
            posts
                .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
                .map(p => {
                return <PostComponent key={p.id} postsItem={p} user={p.user} />
            })
        }
        {showPopup && (
            <div>
                <input
                    placeholder={"Title"}
                    value={title}
                />
                <input
                    placeholder={"Body"}
                    value={body}
                />
                <input
                    placeholder={"Tags"}
                    value={tags}
                />
            </div>
        )}
    </div>
  );
}
export default App;
