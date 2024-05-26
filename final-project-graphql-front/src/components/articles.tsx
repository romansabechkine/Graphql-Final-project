import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import Article from "./article";


const GETARTICLES = gql(`
    query GetArticles {
        getArticles {
        code
        success
        message
        articlesWithLikes {
            article {
            id
            title
            body
            createdAt
            updatedAt
            authorName
            }
            likes {
            likeType
            numberOfLikeType
            articleId
            }
        }
        }
    }
    `)


const Articles = () => {


    const { loading, error, data, refetch } = useQuery(GETARTICLES);

    
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    console.log("Articles data")
    console.log(data)

    if (data) {
        return (
            <>
            <h2>All Articles</h2>
            <div>
                {data?.getArticles?.articlesWithLikes?.map((el) => {
          
                return (
                    <div key={el?.article?.id}>
                        <Article article={el?.article} likes={el?.likes}/>
                    </div>
                )
                })}
            </div>
            </> 
        )
    }
}

export default Articles
