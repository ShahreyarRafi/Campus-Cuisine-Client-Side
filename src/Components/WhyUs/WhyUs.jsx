import React from 'react';
import { Link } from 'react-router-dom';

const WhyUs = () => {
    return (
        <div className='font-primary dark:bg-[#090b11] bg-white duration-300 py-7'>
            <div className="p-8">
                <div className="flex flex-col items-center justify-center">
                    <span className="rounded-full bg-[#B3845A] px-2 py-1 dark:text-white text-black uppercase text-sm">
                        Insight
                    </span>
                </div>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading dark:text-gray-100  text-black text-center mt-6 duration-300">
                    Why Choose <span>Us?</span>
                </h1>
            </div>
            <div className='w-full flex justify-center'>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-8 max-w-xs md:max-w-sm text-center">
                        <div className='w-full flex justify-center'>
                            <div className=" bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500 shadow-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="uppercase mt-6 text-indigo-500 font-bold mb-3">
                            Wide range of brands
                        </h2>
                        <p className="text-sm dark:text-gray-100 text-gray-700 dark:font-normal font-medium mb-3">
                            We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.                    </p>
                        <Link to={'/about-us'}>
                            <a className="text-indigo-500 flex items-center justify-center hover:text-indigo-600 dark:font-normal font-medium">
                                More about us
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </div>
                    <div className="p-8 max-w-xs md:max-w-sm text-center">
                        <div className='w-full flex justify-center'>
                            <div className="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="uppercase mt-6 text-green-500 font-bold mb-3">
                            Trusted by our clients
                        </h2>
                        <p className="text-sm dark:text-gray-100 text-gray-700 dark:font-normal font-medium mb-3">
                            We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.                    </p>
                        <Link to={'/about-us'}>
                            <a className="text-green-500 flex items-center justify-center hover:text-green-600 dark:font-normal font-medium">
                                More about us
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </div>
                    <div className="p-8 max-w-xs md:max-w-sm text-center">
                        <div className='w-full flex justify-center'>
                            <div className="bg-red-100 rounded-full w-16 h-16 flex justify-center items-center text-red-500 shadow-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="uppercase mt-6 text-red-500 font-bold mb-3">
                            Fast & easy financing
                        </h2>
                        <p className="text-sm dark:text-gray-100 text-gray-700 dark:font-normal font-medium mb-3">
                            We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history.                    </p>
                        <Link to={'/about-us'}>
                            <a className="text-red-500 flex items-center justify-center hover:text-red-600 dark:font-normal font-medium">
                                More about us
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010-1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;