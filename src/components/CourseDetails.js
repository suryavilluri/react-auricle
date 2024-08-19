import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost/auricle/api/get-course/${id}`);
                setCourse(response.data.course);
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const deleteLesson = async (lessonId) => {
        try {
            await axios.delete(`http://localhost/auricle/api/delete-lesson/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCourse((prevCourse) => ({
                ...prevCourse,
                lessons: prevCourse.lessons.filter((lesson) => lesson.lession_id !== lessonId),
            }));
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>Course title: {course.title}</h1>
                    <p>description: {course.description}</p>
                    <p>instructor: {course.instructor}</p>
                    <p>duration: {course.duration}</p>
                    <h2>Lessons</h2>
                    {course.lessons && course.lessons.length > 0 ? (
                        <ul>
                            {course.lessons.map((lesson) => (
                                <li key={lesson.lession_id}>
                                    <h3>{lesson.title}</h3>
                                    <p>{lesson.content}</p>
                                    <button onClick={() => deleteLesson(lesson.lession_id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No lessons available.</p>
                    )}
                    {/* Link to create a new lesson */}
                    <Link to={`/create-lesson?course_id=${id}`}>
                        <button>Create Lesson</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
