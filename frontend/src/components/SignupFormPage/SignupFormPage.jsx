import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";
import { useNavigate } from "react-router-dom";

const SignupFormPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    // redirect to homepage after signed up successful
    useEffect(() => {
        if (sessionUser) {
            navigate('/');
        }
    }, [sessionUser, navigate]);

    // handle onChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // handle form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // clear errors
        setErrors([]);

        try {
            // send dispatch
            await dispatch(signup(formData));

            // reset form
            setFormData({
                username: '',
                email: '',
                password: ''
            });
        } catch (res) {
            const data = await res.json();

            if (data.errors > 0) {
                setErrors(data.errors);
            }
        }

    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-title">
                    <h2>Signup Form</h2>
                </div>
                <div className="error-space">
                    {errors && (
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="btn-group">
                    <button type="submit">Signup</button>
                </div>
            </form>
        </div>
    );
};

export default SignupFormPage;
