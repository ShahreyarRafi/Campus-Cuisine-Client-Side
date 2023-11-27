import { useContext, useState } from 'react';
import Logo from '/cc11t.png';
import { Input, Ripple, initTE } from "tw-elements";
import { AuthContext } from '../../services/Firebase/AuthProvider';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

initTE({ Input, Ripple });

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    };


    const { signUp, googleSignIn } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password)) {
            setError("Error: Password must be at least 6 characters in length, must contain a capital letter and a special character");
        } else {
            setError("");
            if (email) {
                try {
                    // Sign up the user
                    await signUp(email, password, name, photoUrl);

                    // Send user data to the server
                    const response = await fetch('http://localhost:5000/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            name,
                            photoUrl,
                            badge: "Bronze",
                            role: "Member",
                        }),
                    });

                    // Handle the API response
                    const result = await response.json();
                    console.log(result);

                    swal({
                        title: "Congratulations!",
                        text: "Registration successful!",
                        icon: "success",
                        button: "Okay",
                    });
                } catch (error) {
                    console.error("Registration error:", error);
                    setError("Registration error: " + error.message);
                }
            }
        }
    };

    return (
        <div className='w-full'>
            <div className='flex items-center justify-center w-full'>
                <section className="gradient-form h-full w-full dark:bg-[#19191b] font-primary flex justify-center">
                    <div className="h-full max-w-5xl w-full">
                        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                            <div className="w-full">
                                <div className="block rounded-lg bg-slate-100 border-b border-b-neutral-200 dark:border-0 dark:bg-[#19191b]">
                                    <div className="px-4 md:px-0">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto h-40"
                                                    src={Logo}
                                                    alt="logo" />
                                                <h4 className="mb-12 mt-1 pb-1 text-2xl font-semibold text-black dark:text-neutral-100 duration-300">
                                                    Campus Cuisine
                                                </h4>
                                            </div>

                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <p className="mb-4 text-black dark:text-neutral-100 duration-300">Please register an account</p>
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        {...register("name", { required: true })}
                                                        onChange={(event) => setName(event.target.value)}
                                                        type="text"
                                                        className="bg-slate-200 dark:bg-zinc-800  text-black dark:text-white peer block min-h-[auto] w-full rounded border dark:border-zinc-700 border-stone-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Name" />
                                                        {errors.name && <span className='text-red-600'>Name is required</span>}

                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Name
                                                    </label>
                                                </div>
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        {...register("email", { required: true })}
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        type="email"
                                                        className="bg-slate-200 dark:bg-zinc-800  text-black dark:text-white peer block min-h-[auto] w-full rounded border dark:border-zinc-700 border-stone-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username" />
                                                        {errors.email && <span className='text-red-600'>Email is required</span>}
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Email
                                                    </label>
                                                </div>
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                                                        onChange={(event) => setPassword(event.target.value)}
                                                        type="password"
                                                        className="bg-slate-200 dark:bg-zinc-800  text-black dark:text-white peer block min-h-[auto] w-full rounded border dark:border-zinc-700 border-stone-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput11"
                                                        placeholder="Password" />
                                                        {errors.password && <span className='text-red-600'>Password is required</span>}
                                                    <label
                                                        htmlFor="exampleFormControlInput11"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Password
                                                    </label>
                                                </div>
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        {...register("photoUrl", { required: true })}
                                                        onChange={(event) => setPhotoUrl(event.target.value)}
                                                        type="text"
                                                        className="bg-slate-200 dark:bg-zinc-800  text-black dark:text-white peer block min-h-[auto] w-full rounded border dark:border-zinc-700 border-stone-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Photo URL" />
                                                        {errors.photoUrl && <span className='text-red-600'>Photo URL is required</span>}
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Photo URL
                                                    </label>
                                                </div>
                                                <div className="mb-6 pb-1 pt-1 text-center">
                                                    <button
                                                        className=" bg-[#B3845A] rounded mb-4 inline-block w-full px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        onClick={handleRegister}
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                    >
                                                        SIGN UP
                                                    </button>
                                                    {/* <input
                                                        type="submit"
                                                        value="Register"
                                                        className="btn hover-bg-[#ffc362] w-full text-white text-lg bg-[#19a463] hover:bg-[#19a463bb]"
                                                    /> */}
                                                    <div>
                                                        <p className='text-red-500 my-5 px-20'>{error}</p>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <a href="#!" className='text-black dark:text-neutral-100 duration-300'>Terms and conditions</a>
                                                        <button
                                                            type='button'
                                                            onClick={googleSignIn} // Trigger Google sign-in
                                                            className=" px-4 py-2 border-2 flex gap-2 rounded border-slate-300 dark:border-zinc-600 text-neutral-500 dark:text-neutral-300 hover:border-slate-500 hover:text-neutral-500 hover:shadow transition duration-150">
                                                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                                            <span>Register with Google</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <Link to={`/login`}>
                                                        <p className="mb-0 mr-2 text-black dark:text-neutral-100 duration-300">Have an account?</p>
                                                    </Link>
                                                    <Link to={`/login`}>
                                                        <button
                                                            type="button"
                                                            className="text-black dark:text-neutral-100 duration-300 rounded inline-block border-2 border-slate-300 dark:border-zinc-600 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                            data-te-ripple-init
                                                            data-te-ripple-color="light">
                                                            Login
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

export default Register;
