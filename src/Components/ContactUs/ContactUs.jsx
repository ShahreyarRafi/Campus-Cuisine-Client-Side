

const ContactUs = () => {
    return (
        <div>
            <div className=" container mx-auto md:px-6 bg-[#eef2fa] dark:bg-[#0f1116] font-rubik text-white px-5 lg:h-[53vh] flex justify-center items-center duration-300">
                <section className=" flex">
                    <div className="flex flex-wrap">
                        <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                            <h2 className="mb-6 text-3xl font-bold text-black dark:text-slate-100">CONTACT US</h2>
                            <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                                We're thrilled to hear from you! Whether you have questions, suggestions, or just want to say hello, please don't hesitate to reach out using the contact form below. Your feedback is important to us, and we're here to assist you with any inquiries related to our gaming and tech event website.
                            </p>
                            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                                New York, 94126, United States
                            </p>
                            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                                + 01 234 567 89
                            </p>
                            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
                                info@gmail.com
                            </p>
                        </div>
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                            <form>
                                <div className="relative mb-3" data-te-input-wrapper-init>
                                    <input type="text"
                                        className="bg-gray-50 dark:bg-zinc-800 py-3 peer block min-h-[auto] w-full border-1 dark:border-0 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleInput90" placeholder="Name" />
                                    <label
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                        htmlFor="exampleInput90">Name
                                    </label>
                                </div>
                                <div className="relative mb-3" data-te-input-wrapper-init>
                                    <input type="email"
                                         className="bg-gray-50 dark:bg-zinc-800 py-3 peer block min-h-[auto] w-full border-1 dark:border-0 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleInput91" placeholder="Email address" />
                                    <label
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                        htmlFor="exampleInput91">Email address
                                    </label>
                                </div>
                                <div className="relative mb-3" data-te-input-wrapper-init>
                                    <textarea
                                        className="bg-gray-50 dark:bg-zinc-800 peer block min-h-[auto] w-full border-0 bg-transparent py-3 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleFormControlTextarea1" rows="3" placeholder="Your message"></textarea>
                                    <label htmlFor="exampleFormControlTextarea1"
                                        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Message</label>
                                </div>
                                <button
                                    type="button"
                                    className='bg-[#B3845A] font-rubik font-semibold text-white px-14 py-4 hover:bg-[#eeb75e] w-full'>
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;