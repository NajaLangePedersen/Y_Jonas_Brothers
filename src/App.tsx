
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

    const handleCreatePost = async () => {
        const newPost = await createPost(
            title,
            body,
            tags.split(" ")
        )
        setShowPopup(false)
    }

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
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "2rem",
                border: "2px solid black",
                borderRadius: "5%",
                zIndex: 1000
            }}>
                <input
                    placeholder={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder={"Body"}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <input
                    placeholder={"Tags"}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button onClick={handleCreatePost}>Create post</button>
            </div>
        )}
    </div>
  );
}
export default App;
