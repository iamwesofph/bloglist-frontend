import { useState } from "react";

const BlogForm = ({ createBlog, toggleVisibility }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const addBlog = async (event) => {
        event.preventDefault();

        createBlog({
            title: title,
            author: author,
            url: url,
        });

        setTitle("");
        setAuthor("");
        setUrl("");

        toggleVisibility();
    };

    return (
        <>
            <form onSubmit={addBlog}>
                <div>
                    <span>Title</span>
                    <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <span>Author</span>
                    <input placeholder="Author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <span>URL</span>
                    <input placeholder="URL" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </>
    );
};

export default BlogForm;
