import { useState } from "react";
import { gql } from "../__generated__";
import { useMutation } from "@apollo/client";


const CREATEARTICLE = gql(`mutation CreateArticle($title: String!, $body: String!) {
    createArticle(title: $title, body: $body) {
      code
      success
      message
      article {
        id
        title
        body
        createdAt
        updatedAt
        authorName
      }
    }
  }`)


const CreateArticle = () => {
    const [formState, setFormState] = useState({
        title: '',
        body: '',
      });

    // CREATE ARTICLE MUTATION
    const [createArticle, {data, loading, error}] = useMutation(CREATEARTICLE, {
        variables: {
            title: formState.title,
            body: formState.body
        }
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (data) {
        //return `Data: ${data}`;
        return <div>
            <div>
                <ul>
                    <li>Code: {data?.createArticle?.code}</li>
                    <li>Message: {data?.createArticle?.message}</li>
                    <li>Success: {data?.createArticle?.success.toString()}</li>
                </ul>
            </div>
            <h3>Title: {data?.createArticle?.article?.title}</h3>
            <div>Body: {data?.createArticle?.article?.body}</div>
            <p>Created at: {data?.createArticle?.article?.createdAt}</p>
            <p>Updated at: {data?.createArticle?.article?.updatedAt}</p>
            <p>Created at: {data?.createArticle?.article?.createdAt}</p>
            <p>ArticleId: {data?.createArticle?.article?.id}</p>
        </div>
    }

    return (
        <div className="signUpContainer">
        <form onSubmit={(e) => {
            e.preventDefault()
            if ((formState.title.length > 5) && (formState.body.length > 5)) {
                createArticle()
            }
            else {
                alert("Should be greater than 5 symbols!")
            }
        }
            }>

        <h2>Create an Article</h2>
        <div>

            <label htmlFor="title">Title</label>
            <input  id="title"  type="text"  name="title"
            value={formState.title}
            onChange={(e) =>
                setFormState({
                    ...formState,
                    title: e.target.value
                })}
             />
            <p></p>
           
            <label htmlFor="body">Body</label>
            <textarea  id="body"  name="body"
            value={formState.body}
            onChange={(e) =>
                setFormState({
                    ...formState,
                    body: e.target.value
                })}
            />

            <p></p>

            <button>Create Article</button>
        </div>
        </form>
        </div>
    )

}

export default CreateArticle