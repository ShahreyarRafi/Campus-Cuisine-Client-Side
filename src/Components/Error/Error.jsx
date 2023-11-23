import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1d1b1d] font-primary">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                <div className="bg-[#B3845A] px-2 text-sm rounded rotate-12 absolute text-neutral-200">
                    Page Not Found
                </div>
                <button className="mt-5">
                    <a
                        className="relative inline-block text-sm font-medium text-[#B3845A] group active:text-orange-300 focus:outline-none focus:ring"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#B3845A] group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>
                        <Link to={`/`}>
                            <span className="relative block px-8 py-3 bg-[#1d1b1d] border border-current">
                                Go Home
                            </span>
                        </Link>
                    </a>
                </button>
            </main>
        </div >
    );
};

export default Error;