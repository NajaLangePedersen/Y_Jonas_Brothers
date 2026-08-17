import type {PostsItem} from "@/types/posts.tsx";
import type {User} from "@/types/users.tsx";

interface PostProps {
    postsItem: PostsItem;
    user: User | undefined;
}

export function PostComponent({postsItem, user}:PostProps) {
    return <div>
        {user
        ? <>{user.firstName} {user.lastName}</>
            : <>Anonymous user</>}
        <br></br>
        <h1>{postsItem.title}</h1><br></br>
        {postsItem.body}<br></br><br></br>
        #{postsItem.tags.join(" #")}<br></br><br></br>
        views: {postsItem.views}<br></br><br></br><br></br>
    </div>
}