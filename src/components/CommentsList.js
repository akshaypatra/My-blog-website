const CommentList=({comments})=>(
    <>
    <h3>Comments:</h3>
    {comments.map(comment=>(
        <div className="comment" key={comment.postBy +':'+comment.text}>
            <h4>{comment.postBy}</h4> 
            <h4>{comment.text}</h4>             

        </div>
    ))}
    </>
);
export default CommentList;