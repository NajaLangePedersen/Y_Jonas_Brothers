import type {PostsItem} from "@/types/posts.tsx";
import type {User} from "@/types/users.tsx";
import type {Comment} from "@/types/comments.tsx";
import {openComments} from "@/components/OpenComments.tsx";
import {useEffect, useState} from "react";

interface PostProps {
    postsItem: PostsItem;
    user: User | undefined;
    comments: Comment;
}

export function PostComponent({postsItem, user, comments}:PostProps) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    function toggleComments() {
        setShowComments(prev => !prev);
    }

    async function fetchComments() {
        const res = await fetch(`https://dummyjson.com/comments/post/${postsItem.id}`);
        const json = await res.json();
        setComments(json.comments);
    }

    useEffect(() => {
        if (showComments) {
            fetchComments();
        }
    }, [showComments]);

    return <div>
        {user
        ? <>{user.firstName} {user.lastName}</>
            : <>Anonymous user</>}
        <br></br>
        <h1>{postsItem.title}</h1><br></br>
        {postsItem.body}<br></br><br></br>
        #{postsItem.tags.join(" #")}<br></br><br></br>
        views: {postsItem.views}
        <button onClick={toggleComments}> {
            showComments ? "Hide comments" : "Show comments"}
            Comments</button>

        {/*Comment section */}
        {showComments && (
            <div>
                {comments.map(c => (
                    <div key={c.id}>

                    </div>
                ))}
            </div>
        )}
        <br></br><br></br><br></br>

    </div>
}

