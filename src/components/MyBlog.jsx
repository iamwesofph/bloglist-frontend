import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, getBlogs, user }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const buttonStyle = {
        padding: ".5rem 1rem",
        backgroundColor: "dodgerblue",
        borderRadius: "0.375rem",
        border: "none",
    };

    const addLike = async () => {
        const blogObject = {
            likes: blog.likes + 1,
        };
        await blogService.update(blog.id, blogObject);

        getBlogs();
    };

    const deleteBlog = async () => {
        if (window.confirm("Are you sure?")) {
            console.log(blog.id);
            await blogService.remove(blog.id);
        }

        getBlogs();
    };

    return (
        <div style={blogStyle}>
            {isCollapsed ? (
                <div>
                    {blog.title} by {blog.author}{" "}
                    <button className="viewBtn" onClick={() => setIsCollapsed(false)}>
                        View
                    </button>
                </div>
            ) : (
                <div>
                    <div>
                        {blog.title} by {blog.author} <button onClick={() => setIsCollapsed(true)}>Hide</button>
                    </div>
                    <div>URL: {blog.url}</div>
                    <div>
                        Likes: {blog.likes}
                        <button className="likeBtn" onClick={() => addLike()}>
                            Like
                        </button>
                    </div>

                    <div>Created by: {blog.user ? blog.user.name : "--no record--"}</div>

                    {blog.user && blog.user.name === user ? (
                        <button onClick={() => deleteBlog()} style={buttonStyle}>
                            Delete
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
