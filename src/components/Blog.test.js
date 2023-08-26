import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For custom matchers
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("Blog component", () => {
    let container;
    const addLikeMock = jest.fn();
    beforeEach(() => {
        container = render(<Blog blog={blog} user="John" addLike={addLikeMock} />).container;
    });

    const blog = {
        title: "Sample Blog",
        author: "John Doe",
        url: "https://example.com/blog/sample",
        likes: 42,
        user: {
            name: "John",
        },
    };

    test("renders title and author, but not URL or likes by default", () => {
        render(<Blog blog={blog} user="John" />);

        // Expect title and author to be visible
        expect(screen.getByText("Sample Blog by John Doe")).toBeInTheDocument();

        // Expect URL and likes not to be visible by default
        expect(screen.queryByText("URL:")).not.toBeInTheDocument();
        expect(screen.queryByText("Likes:")).not.toBeInTheDocument();
    });

    test("shows URL and likes when the 'View' button is clicked", () => {
        render(<Blog blog={blog} user="John" />);

        const viewButton = screen.getByText("View");
        fireEvent.click(viewButton);

        // Expect URL and likes to be visible after clicking the 'View' button
        expect(screen.getByText("URL: https://example.com/blog/sample")).toBeInTheDocument();
        expect(screen.getByText("Likes: 42")).toBeInTheDocument();
    });

    // test("calls the 'addLike' handler twice when the 'Like' button is clicked twice", async () => {
    //     const addLikeMock = jest.fn(); // Create a mock function

    //     render(<Blog blog={blog} user="John" addLike={addLikeMock} />);

    //     const viewButton = screen.getByText("View");
    //     userEvent.click(viewButton);

    //     const likeButton = await screen.findByText("Like");
    //     userEvent.click(likeButton);
    //     // userEvent.click(likeButton);

    //     // Expect the 'addLike' handler to be called twice
    //     expect(addLikeMock).toHaveBeenCalledTimes(1);
    // });

    // test("calls the 'addLike' handler twice when the 'Like' button is clicked twice", () => {
    //     const addLikeMock = jest.fn(); // Create a mock function

    //     render(<Blog blog={blog} user="John" addLike={addLikeMock} />);

    //     // Expand the blog to show the 'Like' button
    //     userEvent.click(screen.getByText("View"));

    //     // Click the 'Like' button twice
    //     const likeButton = screen.getByText("Like");
    //     userEvent.click(likeButton);
    //     userEvent.click(likeButton);

    //     // Expect the 'addLike' handler to be called twice
    //     expect(addLikeMock).toHaveBeenCalledTimes(2);
    // });

    // test("clicking the button calls event handler once", async () => {
    //     const blog = {
    //         title: "Sample Blog",
    //         author: "John Doe",
    //         url: "https://example.com/blog/sample",
    //         likes: 42,
    //         user: {
    //             name: "John",
    //         },
    //     };

    //     const mockHandler = jest.fn();

    //     render(<Blog blog={blog} toggleImportance={mockHandler} />);

    //     const user = userEvent.setup();

    //     const viewButton = screen.getByText("View");
    //     await user.click(viewButton);
    //     const likeButton = screen.getByText("Like");
    //     await user.click(likeButton);

    //     expect(mockHandler.mock.calls).toHaveLength(1);
    // });

    // test("calls the 'addLike' function when the 'Like' button is clicked", () => {
    //     const addLikeMock = jest.fn(); // Create a mock function

    //     const div = container.querySelector(".togglableContent");

    //     const viewButton = screen.getByText("View");
    //     userEvent.click(viewButton);

    //     const likeButton = screen.getByText("Like");
    //     userEvent.click(likeButton);

    //     // Expect the 'addLike' function to be called once
    //     expect(addLikeMock).toHaveBeenCalledTimes(1);
    // });

    test("calls the 'addLike' function when the 'Like' button is clicked", () => {
        const addLikeMock = jest.fn(); // Create a mock function

        const { container } = render(<Blog blog={blog} user="John" getBlogs={() => {}} addLike={addLikeMock} />);

        const viewButton = container.querySelector(".viewBtn"); // Select the Like button using the class name
        const likeButton = container.querySelector(".likeBtn"); // Select the Like button using the class name
        userEvent.click(viewButton);
        userEvent.click(likeButton);
        userEvent.click(likeButton);

        // Expect the 'addLike' function to be called twice
        expect(addLikeMock).toHaveBeenCalledTimes(2);
    });
});
