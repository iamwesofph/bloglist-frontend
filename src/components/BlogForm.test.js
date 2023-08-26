import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import BlogForm from "./BlogForm";

describe("BlogForm component", () => {
    test("calls the 'createBlog' event handler with correct details when a new blog is submitted", () => {
        const createBlogMock = jest.fn(); // Create a mock function
        const toggleVisibilityMock = jest.fn(); // Create a mock function

        render(<BlogForm createBlog={createBlogMock} toggleVisibility={toggleVisibilityMock} />);

        const titleInput = screen.getByPlaceholderText("Title");
        const authorInput = screen.getByPlaceholderText("Author");
        const urlInput = screen.getByPlaceholderText("URL");
        const addButton = screen.getByText("Add Blog");

        const newBlog = {
            title: "Sample Blog",
            author: "John Doe",
            url: "https://example.com/sample",
        };

        userEvent.type(titleInput, newBlog.title);
        userEvent.type(authorInput, newBlog.author);
        userEvent.type(urlInput, newBlog.url);
        userEvent.click(addButton);

        // Expect the 'createBlog' event handler to be called with the correct details
        expect(createBlogMock).toHaveBeenCalledWith(newBlog);
        expect(toggleVisibilityMock).toHaveBeenCalledTimes(0);
    });

    // Add more tests here for other interactions and states of your component
});
