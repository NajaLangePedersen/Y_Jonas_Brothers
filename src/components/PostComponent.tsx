import type {PostsItem} from "@/types/posts.tsx";
import type {User} from "@/types/users.tsx";
import type {Comment} from "@/types/comments.tsx";
import {useEffect, useState} from "react";
import {deleteComment} from "@/services/postsService.tsx";

interface PostProps {
    postsItem: PostsItem;
    user: User | undefined; // Using undefined in case there's no user by the post items userId
    onDelete: () => void;
    currentUser: User | null;
}

export function PostComponent({postsItem, user, onDelete}: PostProps) { //props are coming from App.tsx, whereas comments are coming from each post
    const [showComments, setShowComments] = useState(false); // Decides if comments are shown or not
    const [comments, setComments] = useState<Comment[]>([]); // Sets comments in each post
    const [commentsLoaded, setCommentsLoaded] = useState(false); //This keeps track of whether comments have been loaded.
    const [commentCount, setCommentCount] = useState(postsItem.commentsCount);
    const [newComment, setNewComment] = useState("")

    function toggleComments() {
        setShowComments(prev => !prev);
    }

    // without await, the code would try and use the data/result before it's actually loaded
    async function fetchComments() {
        const res = await fetch(`https://dummyjson.com/comments/post/${postsItem.id}`);
        const json = await res.json();
        setComments(json.comments);
    }

    // Fetch comments if the showComments state is true
    useEffect(() => {
        if (showComments && !commentsLoaded) {
            fetchComments().then(() => setCommentsLoaded(true));
        }
    }, [showComments, commentsLoaded]);

    async function handleDeleteComment(commentId: number) {
        await deleteComment(commentId);
        setComments(prevState => prevState.filter(c => c.id !== commentId));
        setCommentCount(prevState => prevState -1);
    }

    let buttonText: string;
    if (commentCount === 0) {
        buttonText = "Be the first to comment";
    } else if (!showComments) {
        buttonText = `Show comments (${commentCount})`;
    } else {
        buttonText = "Hide comments";
    }

    async function addComment() {
        const res = await fetch('https://dummyjson.com/comments/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                body: newComment,
                postId: postsItem.id,
                userId: Math.floor(Math.random()*70) +31,
            })
        })

        const comment = await res.json()

        setComments(prevComments => [comment, ...prevComments])
        setNewComment("")
    }

    return <div className={"post"}>
        {user
            ? <>{user.firstName} {user.lastName}</>
            : <>Anonymous user</>}
        <br></br>
        <h2 className={"h2s"}>{postsItem.title}</h2>
        {postsItem.body}<br></br><br></br>
        <span className={"blue"}> {/*span is used to mark a small part of the content - usually for style*/}
            #{postsItem.tags.join(" #")}
        </span><br></br><br></br>
        <b>Views: {postsItem.views}</b>
        <button onClick={toggleComments}> {
            buttonText}
        </button>

        <button onClick={onDelete} className={"btnRed"}>Delete</button>
        {/*Comment section */}
        {showComments && (
            <div>
                <input
                    placeholder={"Write your comment here"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addComment();
                            setCommentCount(prevCount => prevCount + 1)
                        }
                    }}
                />
                {/* This map renders the comments. Unlike the map in postsService,
                it does not change the data; it turns each comment into JSX. */}
                {comments.map(c => ( // each comment gets its own <div> and <p> which naturally moves it down to next line without the use of <br>

                    <div key={c.id} className={"comments"}>
                        <p className={"commentsUserName"}>
                            {c.user
                                ? <>{c.user.fullName}</>
                                : <>Anonymous user</>}
                        </p>
                        <p className={"margin0"}>
                            {c.body}
                            <button onClick={() => handleDeleteComment(c.id)} className={"btnTrash"}>&#128465;</button>
                        </p>

                    </div>
                ))}
            </div>
        )}
        <br></br>

    </div>
}

