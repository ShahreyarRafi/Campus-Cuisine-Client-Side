import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';

const UpdateMeal = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const [mealData, setMealData] = useState({
        image: '',
        title: '',
        ingredients: '',
        category: '',
        price: '',
        description: '',
        meal_status: '',
    });

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [mealStatus, setMealStatus] = useState('');

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await axiosPublic.get(`/meals/${id}`);
                setMealData(response.data);
            } catch (error) {
                console.error('Error fetching meal data:', error);
                // Handle error, e.g., show an error message
            }
        };
        fetchMealData();
    }, [axiosPublic, id]);

    // Update state variables when mealData changes
    useEffect(() => {
        setImage(mealData.image || '');
        setTitle(mealData.title || '');
        setIngredients(mealData.ingredients || '');
        setCategory(mealData.category || '');
        setPrice(mealData.price || '');
        setDescription(mealData.description || '');
        setMealStatus(mealData.meal_status || '');
    }, [mealData]);

    const handleUpdate = async () => {
        // Prepare updated meal data
        const updatedMeal = {
            image,
            title,
            description,
            ingredients,
            category,
            price,
            meal_status: mealStatus,
            // Add other properties as needed
        };

        try {
            const response = await axiosPublic.put(`/meals/${id}`, updatedMeal);

            if (response.data.updated) {
                // Handle success, e.g., show a success message
                console.log('Meal updated successfully');
            } else {
                // Handle failure, e.g., show an error message
                console.log('Failed to update meal');
            }
        } catch (error) {
            console.error('Error updating meal:', error);
            // Handle error, e.g., show an error message
        }
    };
    return (
        <div>
            <h2>Update Meal: {mealData.title}</h2>
            <div>
                <div className="bg-[#1965a423] px-5 md:px-24 py-24 font-primary duration-300">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                            <span className="">Update </span>
                            <span className="text-[#B3845A]">Meal</span>
                        </h1>
                        <form >
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
                                            defaultValue={mealData.image}
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
                                            defaultValue={mealData.title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            className="input input-bordered w-full  bg-white duration-300"
                                        />
                                    </label>
                                </div>
                            </div>
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
                                            defaultValue={mealData.ingredients}
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
                                        <select
                                            name="meal_category"
                                            value={category}
                                            onChange={(event) => setCategory(event.target.value)}
                                            className="input input-bordered w-full bg-white dark:text-gray-400 duration-300"
                                        >
                                            <option value="" disabled>Select Meal Category</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                        </select>
                                    </label>
                                </div>

                            </div>
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
                                            defaultValue={mealData.price}
                                            onChange={(event) => setPrice(event.target.value)}
                                            className="input input-bordered w-full text-gray-400  bg-white duration-300"
                                        />
                                    </label>
                                </div>
                                <div className="form-control md:w-1/2 md:ml-4">
                                    <label className="label">
                                        <span className="text-black duration-300">Meal Status</span>
                                    </label>
                                    <label className="rounded-lg">
                                        <select
                                            name="meal_status"
                                            value={mealStatus}
                                            onChange={(event) => setMealStatus(event.target.value)}
                                            className="input input-bordered w-full bg-white dark:text-gray-400 duration-300"
                                        >
                                            <option value="" disabled>Select Meal Status</option>
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Ready">Ready</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mb-10">
                                <label className="label">
                                    <span className="text-black dark-text-slate-300 duration-300">Meal Description</span>
                                </label>
                                <label className="rounded-lg">
                                    <textarea
                                        name="meal_description"
                                        placeholder="Meal Description"
                                        defaultValue={mealData.description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        className="textarea input-bordered w-full h-40 dark-bg-zinc-800 bg-white duration-300"
                                    />
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="btn mb-4 w-full text-white text-lg bg-[#B3845A] hover:bg-[#ebb587]"
                            >
                                Update Meal
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMeal;

