import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className='fixed top-2 z-50 w-full '>
            <nav className="bg-gray-300/10 border-gray-300 border lg:px-6 py-3 rounded-3xl max-w-2xl backdrop-blur-md p-4 sm:mx-auto mx-4">
                <div className="flex  justify-center items-center mx-auto">
                    <ul className="flex  lg:mx-auto font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <NavLink
                            to="/"
                            className={({isActive})=>`block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                            to="/dog"
                            className={({isActive})=>`block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                            >
                                Dog Shower
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                            to="/cat"
                            className={({isActive})=>`block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                            >
                                Cat Shower
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}