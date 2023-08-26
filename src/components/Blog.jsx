import { useState } from "react";

const Blog = ({ blog }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle}>
            {isCollapsed ? (
                <div>
                    {blog.title} by {blog.author} <button onClick={() => setIsCollapsed(false)}>View</button>
                </div>
            ) : (
                <div>
                    <div>
                        {blog.title} by {blog.author} <button onClick={() => setIsCollapsed(true)}>Hide</button>
                    </div>
                    <div>URL: {blog.url}</div>
                    <div>Likes: {blog.likes}</div>
                    {blog.user ? <div>Created by: {blog.user.name}</div> : null} {/* Conditional rendering */}
                </div>
            )}
        </div>
    );
};

export default Blog;
