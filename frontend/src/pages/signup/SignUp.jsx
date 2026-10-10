import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router";
import useStoreAuth from "../../store/useAuth";

const SignUp = () => {
    const [data, setData] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});
    const { signup, isLoadingSignup } = useStoreAuth();



    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
            submit: "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let nextErrors = {};
        if (!data.fullName.trim()) { 
            nextErrors.fullName = "Le nom est obligatoire"
        }
        if (!data.userName.trim()) {
            nextErrors.userName = "Le nom d'utilisateur est obligatoire"
        }
        if (!data.email.toLowerCase().trim()) {
            nextErrors.email = "Email est obligatoire"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            nextErrors.email = "Saisissez une adresse email valide."
        }
        if (!data.password) {
            nextErrors.password = "Le mot de passe est obligatoire"
        } else if (data.password.length < 8) {
            nextErrors.password = "Le mot de passe  doit contenir au moins 8 caractères"
        }

        if (!data.confirmPassword) {
            nextErrors.confirmPassword = "Le mot de passe a confirmé  est obligatoire"
        }
        if (!data.gender) {
            nextErrors.gender = "Choisissez un genre"
        }
        if (data.password !== data.confirmPassword) {
            nextErrors.confirmPassword = "Le mot de passe a confirmé doit etre égal au mot de passe"
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        
       
        

        try {
            await signup(data);
            setData({
                fullName: "",
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                gender: "",
            });
            
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                submit: error.response?.data?.message
                    || error.response?.data?.error
                    || "Échec de l'inscription. Réessayez.",
            }));
        }
        
    };

    return (
        <div className="mx-auto flex w-full min-w-0 max-w-md flex-col items-center justify-center">
            <div className="w-full rounded-lg bg-gray-400 bg-clip-padding p-4 shadow-md backdrop-blur-lg bg-opacity-0 sm:p-6">
                <h1 className="text-center text-2xl font-semibold text-gray-300 sm:text-left sm:text-3xl">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname" className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input onChange={handleChange} id="fullname" name="fullName" type="text" placeholder="John Doe" className="w-full input input-bordered h-10" value={data.fullName} />
                        {errors?.fullName && <p className="py-1 text-sm font-semibold text-orange-900">{ errors.fullName }</p> }
                    </div>

                    <div>
                        <label htmlFor="username" className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input onChange={handleChange} name="userName" id="username" type="text" className="w-full input input-bordered h-10" placeholder="Johndoe" value={data.userName} />
                         {errors?.userName && <p className="py-1 text-sm font-semibold text-orange-900">{ errors.userName }</p> }
                    </div>

                    <div>
                        <label htmlFor="email" className="label p-2">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input onChange={handleChange} name="email" id="email" type="email" className="w-full input input-bordered h-10" placeholder="johndoe5161@gmail.com" value={data.email} />
                         {errors?.email && <p className="py-1 text-sm font-semibold text-orange-900">{ errors.email }</p> }
                    </div>

                    <div>
                        <label htmlFor="password" className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            onChange={handleChange}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            className="w-full h-10 input input-bordered"
                            value={data.password}
                        />
                         {errors?.password && <p className="py-1 text-sm font-semibold text-orange-900">{ errors.password }</p> }
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            onChange={handleChange}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full h-10 input input-bordered"
                            value={data.confirmPassword}
                        />
                         {errors?.confirmPassword && <p className="py-1 text-sm font-semibold text-orange-900">{ errors.confirmPassword }</p> }
                    </div>

                    <GenderCheckBox data={data} errors={errors} handleChange={handleChange} />

                    <Link className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" to="/login">
                        Already have an account?
                    </Link>

                    <div>
                        {errors.submit && <p role="alert" className="py-1 text-sm font-semibold text-orange-900">{errors.submit}</p>}
                        <button type="submit" disabled={isLoadingSignup} className="btn btn-block btn-sm mt-2 border border-slate-700">
                            {isLoadingSignup ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;