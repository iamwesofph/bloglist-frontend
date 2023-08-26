import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const getBlogs = async () => {
        try {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        } catch (error) {
            // Handle error if needed
            console.error("Error fetching blogs:", error);
        }
    };

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
            setNotificationMessage("Wrong credentials");
            setNotificationType("error");
            setTimeout(() => {
                setNotificationMessage(null);
                setNotificationType("");
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
                    <Blog key={blog.id} blog={blog} getBlogs={getBlogs} />
                ))}
            </>
        );
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedNoteappUser");
    };

    const addBlog = async (blogObject) => {
        await blogService.create(blogObject);

        try {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        } catch (error) {
            // Handle error if needed
            console.error("Error fetching blogs:", error);
        }

        // setNotificationMessage(`A new blog ${title} by ${author} successfully added!`);
        setNotificationMessage(`A new blog successfully added!`);
        setNotificationType("success");
        setTimeout(() => {
            setNotificationMessage(null);
            setNotificationType("");
        }, 5000);
    };

    const addBlogForm = () => (
        <Togglable buttonLabel="New Blog" visible={visible} toggleVisibility={toggleVisibility}>
            <BlogForm createBlog={addBlog} toggleVisibility={toggleVisibility} />
        </Togglable>
    );

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notificationMessage} type={notificationType} />

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
