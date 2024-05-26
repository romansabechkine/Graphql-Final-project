import { ArticleWithLikes } from "../__generated__/graphql";



const Article  = (props: ArticleWithLikes) => {

    return (
        <>
        <h2>Article</h2>
        <div>
            <h3>Title: {props?.article?.title}</h3>
            <div>Body: {props?.article?.body}</div>
            <p>Created at: {props?.article?.createdAt}</p>
            <p>Updated at: {props?.article?.updatedAt}</p>
            <p>Created at: {props?.article?.createdAt}</p>
            <p>ArticleId: {props?.article?.id}</p>
            <div>
                <span>Number of likes: {props?.likes?.likeType}: {props?.likes?.numberOfLikeType}</span>
            </div>
        </div>
    </>
    )
}

export default Article