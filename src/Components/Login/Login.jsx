import { useContext, useState } from 'react';
import Logo from '/cc11t.png';
import { Input, Ripple, initTE } from "tw-elements";
import { AuthContext } from '../../services/Firebase/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


initTE({ Input, Ripple });

const Login = () => {
    const { googleSignIn, signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [googleLoginRedirect, setGoogleLoginRedirect] = useState('');

    const handleGoogle = async () => {
        const intendedDestination = location.state?.from || '/';
        setGoogleLoginRedirect(intendedDestination);

        try {
            const result = await googleSignIn();
            console.log(result.user);
            navigate(intendedDestination);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = () => {
        if (email && password) {
            signIn(email, password)
                .then(() => {
                    const locationState = location.state;
                    if (locationState && locationState.from) {
                        navigate(locationState.from);
                    } else {
                        navigate('/');
                    }
                    swal({
                        title: "Congratulations!",
                        text: "Login Was Successful!",
                        icon: "success",
                        button: "Okay",
                    });
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };


    return (
        <div className='w-full bg-[#19191b]'>
            <div className='flex items-center justify-center w-full'>
                <section className="gradient-form h-full dark:bg-neutral-80  font-primary w-full flex justify-center">
                    <div className="h-full w-full max-w-5xl">
                        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                            <div className="w-full">
                                <div className="block bg-[#19191b]">
                                    <div className="px-4 md:px-0 ">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto h-40"
                                                    src={Logo}
                                                    alt="logo" />
                                                <h4 className="mb-12 mt-1 pb-1 text-2xl font-semibold text-neutral-100">
                                                    Campus Cuisine
                                                </h4>
                                            </div>

                                            <form>
                                                <p className="mb-4 text-neutral-100">Please login to your account</p>
                                                <div className="relative mb-4 border dark:border-zinc-700 border-stone-200 rounded" data-te-input-wrapper-init>
                                                    <input
                                                        type="email"
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        className="bg-zinc-800  text-white peer block min-h-[auto] w-full border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Email" />
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Email
                                                    </label>
                                                </div>
                                                <div className="relative mb-4 border dark:border-zinc-700 border-stone-200 rounded" data-te-input-wrapper-init>
                                                    <input
                                                        type="password"
                                                        onChange={(event) => setPassword(event.target.value)}
                                                        className="bg-zinc-800 text-white peer block min-h-[auto] w-full border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput11"
                                                        placeholder="Password" />
                                                    <label
                                                        htmlFor="exampleFormControlInput11"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Password
                                                    </label>
                                                </div>
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <button
                                                        onClick={handleLogin}
                                                        className=" bg-[#B3845A] rounded mb-4 inline-block w-full px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="button"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                    >
                                                        Log in
                                                    </button>

                                                    <div>
                                                        <p className='text-red-500 my-5 px-20'>{error}</p>
                                                    </div>

                                                    <div className='flex justify-between items-center '>
                                                        <a href="#!" className='text-neutral-100'>Forgot password?</a>
                                                        <button
                                                            type='button'
                                                            onClick={handleGoogle}
                                                            className=" px-4 py-2 border-2 flex gap-2 border-slate-200 text-neutral-300 hover:border-slate-400 hover:text-neutral-500 hover:shadow transition duration-150">
                                                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                                            <span>Login with Google</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <Link to={`/register`}>
                                                        <p className="mb-0 mr-2 text-neutral-100">Don't have an account?</p>
                                                    </Link>
                                                    <Link to={`/register`}>
                                                        <button
                                                            type="button"
                                                            className="text-neutral-100 inline-block border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger  transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                            data-te-ripple-init
                                                            data-te-ripple-color="light">
                                                            Register
                                                        </button>
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login;
