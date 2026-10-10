import { useState } from "react";
import { Link } from "react-router";
import useStoreAuth from "../../store/useAuth";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const { login, isLoadingLogin } = useStoreAuth();

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
   
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = {};
        if (!data.email.trim()) {
            nextErrors.email = "Email est obligatoire.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            nextErrors.email = "Saisissez une adresse email valide.";
        };
        if (!data.password) {
            nextErrors.password = "Le mot de passe est obligatoire.";
        } else if (data.password.length < 8) {
            nextErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        };

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        try {
            await login(data);
            setData({
                email: "",
                password: "",
            });
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                login: error.response?.data?.message
                    || "Échec de se connecter. Réessayez."
            }));
        }
    };

    return (
        <div className="mx-auto flex w-full min-w-0 max-w-md flex-col items-center justify-center">
            <div className="w-full rounded-lg bg-gray-400 bg-clip-padding p-4 shadow-md backdrop-blur-lg bg-opacity-0 sm:p-6">
                <h1 className=" text-3xl font-semibold text-center text-gray-300">
                    Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className="label p-2" htmlFor="email">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full input input-bordered h-10"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors?.email && <p id="email-error" className="py-1 text-sm text-orange-900 font-semibold">{errors.email}</p>}
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
                        {errors?.login && (<p role="alert" className="py-1 text-sm font-semibold text-orange-900">{errors.login}</p>)}
                        <button type="submit" disabled={isLoadingLogin} className="btn btn-block btn-sm mt-2">
                            {isLoadingLogin ? "Connexion..." : "Login"}
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