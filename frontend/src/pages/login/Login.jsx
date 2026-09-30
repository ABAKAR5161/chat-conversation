import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
    const [data, setData] = useState({
        userName: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = {};
        if (!data.userName.trim()) {
            nextErrors.userName = "Le nom d'utilisateur est obligatoire.";
        }
        if (!data.password) {
            nextErrors.password = "Le mot de passe est obligatoire.";
        } else if (data.password.length < 8) {
            nextErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        setData({
            userName: "",
            password: "",
        });
        console.log("Login payload:", data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className=" text-3xl font-semibold text-center text-gray-300">
                    Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className="label p-2" htmlFor="username">
                            <span className="text-base label-text">UserName</span>
                        </label>
                        <input
                            id="username"
                            name="userName"
                            onChange={handleChange}
                            value={data.userName}
                            type="text"
                            placeholder="Enter your Username"
                            className="w-full input input-bordered h-10"
                            aria-invalid={Boolean(errors.userName)}
                            aria-describedby={errors.userName ? "username-error" : undefined}
                        />
                        {errors?.userName && <p id="username-error" className="py-1 text-sm text-orange-900 font-semibold">{errors.userName}</p>}
                    </div>
                    <div>
                        <label className="label" htmlFor="password">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        {errors?.password && <p id="password-error" className="py-1 text-sm text-orange-900 font-semibold">{errors.password}</p>}

                    </div>

                    <div>
                        <button type="submit" className="btn btn-block btn-sm mt-2">
                            Login
                        </button>
                    </div>
                    <div className="flex items-center justify-end">
                        <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                            Don't have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;