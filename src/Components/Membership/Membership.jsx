import silver from '../../assets/images/Silver.png';
import gold from '../../assets/images/Gold.png';
import platinum from '../../assets/images/Platinum.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Membership = () => {

  
const [selectedPlanPrice, setSelectedPlanPrice] = useState(0);

const handleSelectPlan = (price) => {
  setSelectedPlanPrice(price);
};



  return (
    <>
      <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
            <span className="text-indigo-600">Membership</span> Plans
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Choose a plan that works best for you.
          </p>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
          {/* Silver Plan */}
          <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
            <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              <img
                src={silver}
                alt=""
                className="rounded-3xl w-16"
              />
              <div className="ml-5">
                <span className="block text-2xl font-semibold">Silver</span>
                <span>
                  <span className="font-medium text-gray-500 text-xl align-top">
                    $&thinsp;
                  </span>
                  <span className="text-3xl font-bold">10 </span>
                </span>
                <span className="text-gray-500 font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-7 font-medium text-gray-500">
              {/* Feature list for Silver Plan */}
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Get <span className="text-black">On Time Delivery</span>
                </span>
              </li>
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Get Flat <span className="text-black">10% Discount </span>On Every Meal
                </span>
              </li>
              <li className="flex text-lg">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  <span className="text-black">5 TB</span> cloud storage
                </span>
              </li>
            </ul>
            <Link to={`/dashboard/user/payment?checkout=${'Silver'}`} >
              <a
                href="#/"
                className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl"
              >
                Choose Plan
                <img
                  src="https://res.cloudinary.com/williamsondesign/arrow-right.svg"
                  className="ml-2"
                  alt=""
                />
              </a>
            </Link>

          </div>

          {/* Gold Plan */}
          <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
            <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
              <img
                src={gold}
                alt=""
                className="rounded-3xl w-16"
              />
              <div className="ml-5">
                <span className="block text-3xl font-semibold text-white">
                  Gold
                </span>
                <span>
                  <span className="font-medium text-xl align-top">
                    $&thinsp;
                  </span>
                  <span className="text-3xl font-bold text-white">24 </span>
                </span>
                <span className="font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-10 font-medium text-xl">
              {/* Feature list for Gold Plan */}
              <li className="flex mb-6">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  Get <span className="text-white">Fast Delivery</span>
                </span>
              </li>
              <li className="flex mb-6">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  Get Flat <span className="text-white">20% Discount </span>On Every Meal
                </span>
              </li>
              <li className="flex">
                <img src="https://res.cloudinary.com/williamsondesign/check-white.svg" />
                <span className="ml-3">
                  <span className="text-white">15 TB</span> cloud storage
                </span>
              </li>
            </ul>
            <Link to={`/dashboard/user/payment?checkout=${'Gold'}`} >
              <a
                href="#/"
                className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl"
              >
                Choose Plan
                <img
                  src="https://res.cloudinary.com/williamsondesign/arrow-right.svg"
                  className="ml-2"
                  alt=""
                />
              </a>
            </Link>
          </div>

          {/* Platinum Plan */}
          <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
            <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              <img
                src={platinum}
                alt=""
                className="rounded-3xl w-16"
              />
              <div className="ml-5">
                <span className="block text-2xl font-semibold">Platinum</span>
                <span>
                  <span className="font-medium text-gray-500 text-xl align-top">
                    $&thinsp;
                  </span>
                  <span className="text-3xl font-bold">35 </span>
                </span>
                <span className="text-gray-500 font-medium">/ user</span>
              </div>
            </div>
            <ul className="mb-7 font-medium text-gray-500">
              {/* Feature list for Platinum Plan */}
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Get<span className="text-black">Priority Delivery</span>
                </span>
              </li>
              <li className="flex text-lg mb-2">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  Ger <span className="text-black">Flat 25% Discount</span> On Every Meal
                </span>
              </li>
              <li className="flex text-lg">
                <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                <span className="ml-3">
                  <span className="text-black">Unlimited</span> cloud storage
                </span>
              </li>
            </ul>
            <Link to={`/dashboard/user/payment?checkout=${'Platinum'}`} >
              <a
                href="#/"
                className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl"
              >
                Choose Plan
                <img
                  src="https://res.cloudinary.com/williamsondesign/arrow-right.svg"
                  className="ml-2"
                  alt=""
                />
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Membership;
