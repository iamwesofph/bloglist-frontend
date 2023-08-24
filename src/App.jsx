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

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

            // noteService.setToken(user.token);
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

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={errorMessage} />

            {!user && login()}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    {bloglist()}
                </div>
            )}
        </div>
    );
};

export default App;
