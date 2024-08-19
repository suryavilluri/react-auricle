import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateLesson = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courseId, setCourseId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Extract course_id from query parameters
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('course_id');
        setCourseId(id);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost/auricle/api/create-lesson', { title, content, course_id: courseId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Lesson created successfully!');
            navigate('/courses');
            // Optionally redirect or clear the form
        } catch (error) {
            console.error('Error creating lesson:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lesson Title"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Lesson Content"
                required
            />
            <button type="submit">Create Lesson</button>
        </form>
    );
};

export default CreateLesson;
