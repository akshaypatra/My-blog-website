import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./notFoundPage";
import axios from 'axios';
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import CommentList from "../components/CommentsList";

const ArticlePage=()=>{

    const [articleInfo,setArticleInfo]=useState({upvotes:0,comments:[],canUpvote:false,});
    const {canUpvote}=articleInfo;
    const {articleId}=useParams();

    const {user,isLoading}=useUser();

    const article=articles.find(article=>article.name===articleId);

    useEffect(()=>{
        const fetchData=async ()=>{
            const token=user && await user.getIdToken();
            const headers=token?{authtoken:token}:{};
            const response=await axios.get(`/api/articles/${articleId}`,{headers});
            const newArticleInfo=response.data;
            setArticleInfo(newArticleInfo);
            }
        if(!isLoading){
        fetchData();
        }
    },[isLoading,user]);

    
    const addUpvote=async ()=>{
        const token=user && await user.getIdToken();
        const headers=token?{authtoken:token}:{};
        const response=await axios.put(`/api/articles/${articleId}/upvote`,null,{headers});
        const updatedArticle=response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article){
        return <NotFoundPage/>
    }
    return(
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user
             ?<button onClick={addUpvote}>{canUpvote?'Upvote':'Already Upvoted'}</button>
             :<button >Log in to upvote</button>
            }
            <p>This Article has {articleInfo.upvotes} up Votes</p>
        </div>
        {article.content.map((paragraph,i)=>(
            <p key={i} >{paragraph}</p>
        ))}
        {user
            ?<AddCommentForm  
                articleName={articleId}
                onArticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)}/>
            :<button>Log in to Comment</button>
        }
        <CommentList comments={articleInfo.comments}/>
        
        </>
    );
}

export default ArticlePage;