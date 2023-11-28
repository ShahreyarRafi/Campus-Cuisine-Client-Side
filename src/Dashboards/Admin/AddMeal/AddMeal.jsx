import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../services/Firebase/AuthProvider';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';

const formatCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19);
    return formattedDate;
};

const AddMeal = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [postTime, setPostTime] = useState(formatCurrentDateTime());

    const handlePostTimeChange = (e) => {
        setPostTime(e.target.value);
    };

    const [image, setImage] = useState()
    const [title, setTitle] = useState()
    const [ingredients, setIngredients] = useState()
    const [category, setCategory] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()

    const handleSubmit = async (event, action) => {
        event.preventDefault();

        const newMeal = {
            image,
            title,
            description,
            ingredients,
            category,
            price,
            post_time: postTime,
            ratings: 0,
            review_count: 0,
            reviews: [],
            liked_count: 0,
            posted_by: user.displayName,
            posted_by_email: user.email,
        };

        // Check the action argument to determine the meal_status
        if (action === 'addMeal') {
            newMeal.meal_status = 'Ready';
        } else if (action === 'addToUpcoming') {
            newMeal.meal_status = 'Upcoming';
        }

        try {
            const response = await axiosPublic.post('/meals', newMeal);

            if (response.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Meal Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add meal',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error adding meal:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add meal',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };



    //         fetch('https://bd-jobs-server.vercel.app/add-job', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newJob)
    //         })
    //             .then(response => {
    //                 if (!response.ok) {
    //                     throw new Error(`Network response was not ok (status: ${response.status})`);
    //                 }
    //                 return response; // Parse the response as JSON
    //             })
    //             .then(data => {
    //                 console.log(data);
    //                 if (data.insertedId) {
    //                     Swal.fire({
    //                         title: 'Success!',
    //                         text: 'Job Added Successfully',
    //                         icon: 'success',
    //                         confirmButtonText: 'OK'
    //                     });
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 // Handle errors here
    //             });

    //     }
    // };



    return (
        <div>
            <div className="bg-[#1965a423] px-5 md:px-24 py-24 font-primary duration-300">
                <div className='max-w-6xl mx-auto'>
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Add a </span>
                        <span className="text-[#B3845A]">Meal</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* Banner Image and Company Logo row */}
                        <div className="md:flex mb-5 md:mb-8">
                            <div className="form-control md:w-1/2 mb-4 md:mb-0">
                                <label className="label">
                                    <span className="text-black  duration-300">Image</span>
                                </label>
                                <label className="rounded-lg">
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="Image URL"
                                        onChange={(event) => setImage(event.target.value)}
                                        className="input input-bordered w-full bg-white duration-300"
                                    />

                                </label>
                            </div>
                            <div className="form-control md:w-1/2 md:md:ml-4">
                                <label className="label">
                                    <span className="text-black  duration-300">Title</span>
                                </label>
                                <label className="rounded-lg">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Meal Title"
                                        onChange={(event) => setTitle(event.target.value)}
                                        className="input input-bordered w-full  bg-white duration-300"
                                    />
                                </label>
                            </div>
                        </div>
                        {/* Company Name and Posted By row */}
                        <div className="md:flex mb-5 md:mb-8">
                            <div className="form-control md:w-1/2 mb-4 md:mb-0">
                                <label className="label">
                                    <span className="text-black  duration-300">Ingredients</span>
                                </label>
                                <label className="rounded-lg">
                                    <input
                                        type="text"
                                        name="ingredients"
                                        placeholder="Meal Ingredients"
                                        onChange={(event) => setIngredients(event.target.value)}
                                        className="input input-bordered w-full  bg-white duration-300"
                                    />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2 md:ml-4">
                                <label className="label">
                                    <span className="text-black  duration-300">Category</span>
                                </label>
                                <label className="rounded-lg">
                                    <select name="meal_category" onChange={(event) => setCategory(event.target.value)} className="input input-bordered w-full  bg-white dark:text-gray-400 duration-300">
                                        <option value="" disabled selected >Select Meal Category</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        {/* Posted By Email and Job Title row */}
                        <div className="md:flex mb-5 md:mb-8">
                            <div className="form-control md:w-1/2 mb-4 md:mb-0">
                                <label className="label">
                                    <span className="text-black  duration-300">Price</span>
                                </label>
                                <label className="rounded-lg">
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Price Here"
                                        onChange={(event) => setPrice(event.target.value)}
                                        className="input input-bordered w-full text-gray-400  bg-white duration-300"
                                    />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2 md:ml-4">
                                <label className="label">
                                    <span className="text-black duration-300">Post Time</span>
                                </label>
                                <label className="rounded-lg">
                                    <input
                                        type="datetime-local"
                                        name="post_time"
                                        value={postTime}
                                        onChange={handlePostTimeChange}
                                        readOnly
                                        className="input input-bordered w-full dark-bg-zinc-800 bg-white duration-300"
                                    />
                                </label>
                            </div>
                        </div>
                        {/* Job Description row */}
                        <div className="form-control mb-10">
                            <label className="label">
                                <span className="text-black dark-text-slate-300 duration-300">Meal Description</span>
                            </label>
                            <label className="rounded-lg">
                                <textarea
                                    name="meal_description"
                                    placeholder="Meal Description"
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="textarea input-bordered w-full h-40 dark-bg-zinc-800 bg-white duration-300"
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'addMeal')}
                            className="btn mb-4 w-full text-white text-lg bg-[#B3845A] hover:bg-[#ebb587]"
                        >
                            Add Meal
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'addToUpcoming')}
                            className="btn w-full text-white text-lg bg-[#B3845A] hover:bg-[#ebb587]"
                        >
                            Add to Upcoming
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMeal;
