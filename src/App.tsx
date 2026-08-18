
import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";
import {fetchPosts, createPost, deletePost, deleteComment} from "@/services/postsService.tsx";

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
            tags.split(" "),
        )

        const newPostWComments = {
            ...newPost,
            commentsCount: 0
        }

        setPosts(prevPosts => [newPostWComments, ...prevPosts])
        setShowPopup(false)
    }

    async function handleDelete(id: number) {
        await deletePost(id);
        setPosts(prevState => prevState.filter(p => p.id !== id));
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
            style={{width: "100%"}}
        />
        <button style={{marginBottom: "5rem", width: "100%"}} onClick={() => setShowPopup(true)}>Create post</button>
        {
            posts
                .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
                .map(p => {
                return <PostComponent key={p.id} postsItem={p} user={p.user} onDelete={() => handleDelete(p.id)}/>
            })
        }
        {showPopup && (
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "4rem",
                border: "2px solid rgb(0, 119, 204)",
                borderRadius: "5%",
                zIndex: 1000,
                textAlign: "center"
            }}>
                <h2 style={{marginTop: "0", marginBottom: "1rem"}}>What's on your mind?</h2>
                <textarea
                    placeholder={"Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        height: "2.2rem",
                        width: "25rem",
                        verticalAlign: "top",
                        marginBottom: "1rem"
                    }}
                /><br></br>
                <textarea
                    placeholder={"Body"}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{
                        height: "7rem",
                        width: "25rem",
                        verticalAlign: "top",
                        marginBottom: "1rem"
                    }}
                /><br></br>
                <textarea
                    placeholder={"Tags"}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={{
                        height: "2.2rem",
                        width: "25rem",
                        verticalAlign: "top",
                        marginBottom: "1rem"
                    }}
                /><br></br>
                <button onClick={handleCreatePost}>Create post</button>
            </div>
        )}
    </div>
  );
}
export default App;
