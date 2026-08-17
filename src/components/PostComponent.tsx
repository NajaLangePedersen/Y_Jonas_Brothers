import type {PostsItem} from "@/types/posts.tsx";

export function PostComponent(postsItem: PostsItem) {
    return <div>
        {postsItem.userId}<br></br>
        <h1>{postsItem.title}</h1><br></br>
        {postsItem.body}<br></br><br></br>
        #{postsItem.tags.join(" #")}<br></br><br></br>
        views: {postsItem.views}<br></br><br></br><br></br>
    </div>
}