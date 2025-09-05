/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from "react";
import SingleComment from "./SingleComment";
import CommentInput from "./CommentInput";
import { useParams } from "react-router";
import { fetchCurrentVideoComments } from "../../slice/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import EmptyComments from "./EmptyComments";

function ListComments() {
    const { video_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching comments for video ID:", video_id);
        dispatch(fetchCurrentVideoComments(video_id));
    }, [video_id, dispatch]);

    const { comments } = useSelector((state) => state.comments);

    return (
        <div>
            <div className=" inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                <div className="block">
                    <h6 className="mb-4 font-semibold">
                        {comments.length} Comments
                    </h6>
                    <CommentInput videoId={video_id} />
                </div>
                <hr className="my-4 border-white" />
                {comments.length === 0 ? (
                    <EmptyComments />
                ) : (
                    comments.map((comment) => (
                        <SingleComment
                            key={comment?.id}
                            src={comment?.owner?.avatar?.url}
                            alt={comment?.owner?.username}
                            username={comment?.owner?.username}
                            comment={comment?.content}
                            time={comment?.createdAt}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ListComments;
