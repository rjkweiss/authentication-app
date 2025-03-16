import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useNavigate } from "react-router-dom";




const LoginFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        credential: '',
        password: ''
    });

    const [errors, setErrors] = useState([]);

    // get session user
    const sessionUser = useSelector((state) => state.session.user);

    // redirect to homepage if logged in
    useEffect(() => {
        if (sessionUser) {
            navigate('/');
        }
    }, [sessionUser, navigate]);

    // handle on change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // update
        setFormData({
            ...formData,
            [name]: value
        })
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // reset errors
        setErrors([]);

        // try submitting
        try {

            // dispatch login thunk to login user
            await dispatch(login(formData));

            // reset form
            setFormData({
                credential: '',
                password: ''
            });

        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-title">
                    <h2>Login</h2>
                </div>
                {/* errors */}
                <div className="error-space">
                    {errors && (
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    )}
                </div>
                {/* input fields */}
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="credential"
                        id="credential"
                        value={formData.credential}
                        onChange={handleChange}
                        placeholder="* username or email"
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="* password"
                    />
                </div>
                <div className="btn-group">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormPage;
