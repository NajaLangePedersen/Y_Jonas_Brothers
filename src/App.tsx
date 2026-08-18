import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";
import {fetchPosts, createPost, deletePost, deleteComment} from "@/services/postsService.tsx";
import type {User} from "@/types/users.tsx";

export function App() {

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [posts, setPosts] = useState<PostsItem[]>([])
    const [search, setSearch] = useState("")
    const [showPopup, setShowPopup] = useState(false)

    //useStates for elements to create new post
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")

    const handleCreatePost = async () => {
        const newPost = await createPost(
            title,
            body,
            tags.split(" "),
            currentUser ? currentUser.id : null
        )

        const newPostWComments = {
            ...newPost,
            userId: currentUser ? currentUser.id : null,
            user: currentUser ?? undefined,
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

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then(r => r.json())
            .then(data => setUsers(data.users));
    }, []);

    return (

        <div>
            <input
                placeholder={"Search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    display: "block"
                }}
            />
            <select value={currentUser?.id ?? ""}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        const user = users.find(u => u.id === id) || null;
                        setCurrentUser(user);

                    }}
            >
                <option value="">Select user</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
                        {u.firstName} {u.lastName}
                    </option>
                ))}
            </select>
            <button style={{
                marginBottom: "5rem",
                marginLeft: 0,
                marginRight: 0,
                width: "100%"
            }} onClick={() => setShowPopup(true)}>Create post
            </button>
            {
                posts
                    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
                    .map(p => {
                        return <PostComponent
                            key={p.id}
                            postsItem={p}
                            user={p.user}
                            onDelete={() => handleDelete(p.id)}
                            currentUser={currentUser}
                        />
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
