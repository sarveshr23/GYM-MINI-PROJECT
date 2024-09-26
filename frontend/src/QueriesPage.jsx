import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QueriesPage.css';

function QueriesPage() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState(''); // Stores the reply message
    const [replyingTo, setReplyingTo] = useState(null); // Tracks the query being replied to

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('http://localhost:3001/queries');
                setQueries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching queries:', error);
                setLoading(false);
            }
        };

        fetchQueries();
    }, []);

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleReplySubmit = (queryId, email, phone) => {
        // Construct the WhatsApp URL with the phone number and message
        const message = `Reply to your query: ${reply}`;
        const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    
        // Open WhatsApp with the pre-filled message
        window.open(whatsappUrl, '_blank');
    
        // Proceed with the rest of your logic (e.g., mark query as replied in your database)
        // Optionally, you could also save the reply and update the UI here if needed
        setReply(''); // Clears the reply box after sending
        setReplyingTo(null); // Clears the currently replying query
    };
    

    const handleDeleteQuery = async (queryId) => {
        try {
            await axios.delete(`http://localhost:3001/queries/${queryId}`);
            alert('Query deleted successfully!');
            
            // Refresh the list of queries after deletion
            setQueries(queries.filter(query => query._id !== queryId));
        } catch (error) {
            console.error('Error deleting query:', error);
            alert('Failed to delete query.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="queries-container">
            <h2>Queries</h2>
            <div className="queries-list">
                {queries.length === 0 ? (
                    <p>No queries found.</p>
                ) : (
                    queries.map((query) => (
                        <div key={query._id} className="query-box">
                            <h4>{query.name}</h4>
                            <p>Email: {query.email}</p>
                            <p>Phone: {query.phone}</p>
                            <p>Message: {query.message}</p>
                            <p>{new Date(query.date).toLocaleString()}</p>

                            {replyingTo === query._id ? (
                                <div className="reply-box">
                                    <textarea
                                        value={reply}
                                        onChange={handleReplyChange}
                                        placeholder="Write your reply..."
                                    />
                                    <button
                                        onClick={() => handleReplySubmit(query._id, query.email,query.phone)}
                                    >
                                        Send Reply
                                    </button>
                                </div>
                            ) : (
                                <div className="query-actions">
                                    <button onClick={() => setReplyingTo(query._id)}>
                                        Reply
                                    </button>
                                    <button onClick={() => handleDeleteQuery(query._id)}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default QueriesPage;
