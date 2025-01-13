import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './StreamingDetails.css';

const socket = io('http://localhost:5000'); // Connect to the backend server

const StreamingDetails = () => {
  const [users, setUsers] = useState([]); // State for users joined
  const [comments, setComments] = useState([]); // State for user comments

  // Fetch data from the backend
  useEffect(() => {
    // Listen for user join events
    socket.on('user-joined', (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    // Listen for new comments
    socket.on('new-comment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    // Clean up event listeners
    return () => {
      socket.off('user-joined');
      socket.off('new-comment');
    };
  }, []);

  return (
    <div className="streamingDetailsContainer">
      <h1>Streaming Details</h1>
      <div className="streamingContent">
        {/* Users Section */}
        <div className="usersSection">
          <h2>Users Joined</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="commentsSection">
          <h2>Comments</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamingDetails;