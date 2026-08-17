
import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {useEffect, useState} from "react";

export function App() {

    const [posts, setPosts] = useState<PostsItem[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.posts)
            });
    }, []);

    return (

    <div>
        {
            posts.map(p => {
                return <PostComponent id={p.id} title={p.title} body={p.body} tags={p.tags} reactions={p.reactions} views={p.views} userId={p.userId} />
            })
        }
    </div>
  );
}

function PostComponent(postsItem: PostsItem) {
    return <div> {postsItem.title}</div>
}

export interface Reactions {
    likes: number
    dislikes: number
}

export interface PostsItem {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

export interface Root {
    posts: PostsItem[]
    total: number
    skip: number
    limit: number
}

export default App;
