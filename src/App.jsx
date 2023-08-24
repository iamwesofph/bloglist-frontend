import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    // useEffect(() => {
    //     blogService.getAll().then((blogs) => setBlogs(blogs));
    // }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await blogService.getAll();
                setBlogs(blogs);
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const login = () => {
        return (
            <form onSubmit={handleLogin}>
                <h2>Login to Application</h2>
                <div>
                    <span>Username</span>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        );
    };

    const bloglist = () => {
        return (
            <>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </>
        );
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedNoteappUser");
    };

    const handleAddBlog = async (event) => {
        event.preventDefault();
        const blogObject = {
            title: title,
            author: author,
            url: url,
        };

        try {
            const returnedBlog = await blogService.create(blogObject);
            setBlogs(blogs.concat(returnedBlog));
            setTitle("");
            setAuthor("");
            setUrl("");
        } catch (error) {
            // Handle error if needed
            console.error("Error adding note:", error);
        }
    };

    const addBlogForm = () => {
        return (
            <form onSubmit={handleAddBlog}>
                <div>
                    <span>Title</span>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <span>Author</span>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <span>URL</span>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <button type="submit">Add Blog</button>
            </form>
        );
    };

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={errorMessage} />

            {!user && login()}
            {user && (
                <div>
                    <p>
                        {user.name} logged in <button onClick={handleLogout}>Logout</button>
                    </p>
                    {addBlogForm()}
                    {bloglist()}
                </div>
            )}
        </div>
    );
};

export default App;
