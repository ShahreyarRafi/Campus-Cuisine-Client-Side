// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom';
// import { DarkModeSwitch } from 'react-toggle-dark-mode';

// const FloatingButton = () => {
//     const userTheme = localStorage.getItem('theme');

//     // default light
//     // const [theme, setTheme] = useState(userTheme === 'dark' ? true : false);

//     // default dark
//     // const [theme, setTheme] = useState(userTheme === 'light' ? false : true);


//     // Set the initial theme state based on the user's preference or default to dark
//     const [theme, setTheme] = useState(userTheme === 'light' ? false : true);

//     const toggleTheme = () => {
//         const newTheme = !theme;
//         setTheme(newTheme);
//         localStorage.setItem('theme', newTheme ? 'dark' : 'light');
//     };

//     useEffect(() => {
//         document.documentElement.classList.toggle('dark', theme);
//     }, [theme]);

//     return (
//         <div className="fixed top-28 right-8 dark:bg-slate-700 bg-gray-100 pl-5 pr-2 rounded-full">
//             <DarkModeSwitch
//                 style={{ marginBottom: '2rem' }}
//                 checked={theme}
//                 onChange={toggleTheme}
//                 size={120}
//             />
//         </div>
//     );
// };

// const root = createRoot(document.getElementById('root'));
// root.render(<FloatingButton />);
// export default FloatingButton;





// ---------------------------button 1-------------------------------

// button 1



// import React, { useCallback, useEffect, useState } from 'react';
// import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
// import DarkModeToggle from "react-dark-mode-toggle";




// const FloatingButton = () => {

//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "dark"
//   );

//   const element = document.documentElement;
//   const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

//   const options = [
//     {
//       icon: <BsFillSunFill />,
//       text: "light",
//     },
//     {
//       icon: <BsFillMoonStarsFill />,
//       text: "dark",
//     }
//   ]

//   function onWindowMatch() {
//     if (
//       theme === "dark" || // Use the 'theme' state value here
//       (!("theme" in localStorage) && darkQuery.matches)
//     ) {
//       element.classList.add("dark");
//     } else {
//       element.classList.remove("dark");
//     }
//   }

//   const memoizedOnWindowMatch = useCallback(onWindowMatch, [theme]);

//   useEffect(() => {
//     localStorage.setItem("theme", theme); // Save the selected theme in localStorage
//     memoizedOnWindowMatch();
//   }, [theme, memoizedOnWindowMatch]);

//   useEffect(() => {
//     // Initialize the theme when the component mounts
//     memoizedOnWindowMatch();
//   }, [memoizedOnWindowMatch]);

//   return (
//     <div className="fixed top-28 right-8 dark:bg-slate-700 bg-gray-100 pl-5 pr-2 rounded-full">
//       {
//         options?.map(opt => (
//           <button
//             key={opt.text}
//             onClick={() => setTheme(opt.text)}
//             className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text ? "text-sky-600" : "text-neutral-400"}`}
//           >
//             {opt.icon}
//           </button>

//         ))
//       }

//     </div>
//   );
// };

// export default FloatingButton;





// ---------------------------button 2-------------------------------

// button 2


// import React, { useEffect, useState } from 'react';
// import DarkModeToggle from "react-dark-mode-toggle";

// const FloatingButton = () => {
//     const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark");

//     const toggleTheme = () => {
//         const newTheme = !theme;
//         setTheme(newTheme);
//         localStorage.setItem("theme", newTheme ? "dark" : "light");
//     };

//     useEffect(() => {
//         document.documentElement.classList.toggle("dark", theme);
//     }, [theme]);

//     return (
//         <div className="fixed bottom-4 right-5">
//             <DarkModeToggle
//                 onChange={toggleTheme}
//                 checked={theme}
//                 size={50}
//             />
//         </div>
//     );
// };

// export default FloatingButton;
