import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost/auricle/api/get-all-courses');
                setCourses(response.data.courses.data);
                console.log(response.data.courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost/auricle/api/delete-course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <h1>Courses</h1>
            <div>
                <Link to="/create-course"><button>Create Course</button></Link>
                {/* <Link to="/create-lesson"><button>Create Lesson</button></Link> */}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <Link to={`/courses/${course.course_id}`}>View Details</Link><br/>
                            <button onClick={() => deleteCourse(course.course_id)}>Delete Course</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Course;
