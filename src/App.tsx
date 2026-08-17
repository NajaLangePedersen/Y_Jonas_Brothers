
import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {useEffect, useState} from "react";

import type {PostsItem, Root, Reactions} from "@/types/posts.tsx";
import {PostComponent} from "@/components/PostComponent.tsx";

export function App() {

    const [posts, setPosts] = useState<PostsItem[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json: Root) => {
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
export default App;
