import { useState } from 'react';
import { motion } from "framer-motion";
import { IoPersonOutline } from 'react-icons/io5';
import { PiBriefcaseLight } from 'react-icons/pi';
import { PiCalendarPlusLight } from 'react-icons/pi';
import { PiCalendarCheckLight } from 'react-icons/pi';
import { BsCheck2Square } from 'react-icons/bs';
import { BsCashCoin } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const MealsByCategory = ({ allMeals }) => {
    const tabs = [
        { id: "All", label: "All Meals" },
        { id: "Breakfast", label: "Breakfast" },
        { id: "Lunch", label: "Lunch" },
        { id: "Dinner", label: "Dinner" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [showAllMeals, setShowAllMeals] = useState(false);

    // Function to toggle between showing all meals and displaying 4 meals
    const toggleShowAllMeals = () => {
        setShowAllMeals(!showAllMeals);
    };

    // Calculate the number of meals in the current tab
    const mealsInCurrentTab = allMeals.filter(meal => activeTab === "All" ? true : meal.category === activeTab);

    return (
        <div className="flex flex-col items-center justify-center py-10 bg-[#1965a423] font-primary">
            <h1 className="text-5xl font-bold mb-10 mt-5 "><span className="text-slate-700">Meals by </span><span className="text-[#B3845A]">Categories</span></h1>
            <div className="flex space-x-1 mb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setShowAllMeals(false); // Reset to display only 4 meals when changing tabs
                        }}
                        className={`${activeTab === tab.id ? "" : "hover:text-[#B3845A]"}
                            relative rounded-full px-3 py-1.5 text-base font-medium black outline-sky-400 transition focus-visible:outline-2`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="bubble"
                                className="absolute inset-0 z-10 bg-[#d49b69f5] mix-blend-multiply"
                                style={{ borderRadius: 9999 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="max-w-[1550px] w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-10 px-10 mx-auto">
                {mealsInCurrentTab
                    .slice(0, showAllMeals ? mealsInCurrentTab.length : 4) // Conditionally slice based on showAllMeals state
                    .map((meal, index) => (
                        <div key={index}>
                            <div key={meal._id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={meal.image}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <h5 className='text-2xl mb-2 text-slate-700'> {meal.title} </h5>
                                        <p className='text-sm mb-2 text-slate-700'> {meal.description} </p>
                                        <p className='font-bold mb-1 text-slate-700'> Category: {meal.category} </p>
                                        <p className='font-bold mb-1 text-slate-700'> Status: {meal.meal_status} </p>
                                        <p className='font-bold text-slate-700'> Price: ${meal.price} </p>
                                    </CardContent>
                                    <CardActions>
                                        <p className='text-[#B3845A] mx-2'>Share</p>
                                        <p className='text-[#B3845A]'>Learn More</p>
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Conditionally render the "Show All" or "Show Less" button based on the number of meals in the current tab */}
            {mealsInCurrentTab.length > 4 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={toggleShowAllMeals}
                        className="bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text- text-white md:px-12 px-7 md:py-4 py-2 rounded">
                        {showAllMeals ? "Show Less" : "Show All"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MealsByCategory;





