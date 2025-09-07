import React, { useState } from "react";
import PropTypes from "prop-types";
import { commentService } from "../../service/comment.service";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../slice/commentSlice";

function CommentInput({ videoId }) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const commentData = new FormData(e.target);

        setLoading(true);
        setError("");
        try {
            const resp = await commentService.postComment(videoId, commentData);
            dispatch(addComment(resp.payload));
            setComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
            setError("Failed to post comment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                    placeholder="Add a Comment"
                    name="content"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !comment.trim()}
                    className="cursor-pointer rounded-lg bg-blue-500 px-4 py-1 text-white disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

CommentInput.propTypes = {
    videoId: PropTypes.string.isRequired,
    onCommentPosted: PropTypes.func
};

export default CommentInput;
