// import React from 'react';
import  Shovapoti  from '../images/shovapoti.png';
import  Editor2  from '../images/editor2.png';
import  Library  from '../images/libarary.png';
import  College  from '../images/college.jpeg';
import  ExamCommittee  from '../images/examCommittee.png';
import  Architecture  from '../images/Architect.jpeg';
import  Committee  from '../images/committee.png';
import  DeputyRegister  from '../images/deputyRegister.png';
import  MedicalOfficer  from '../images/medicalOfficer.jpeg';
import  Register  from '../images/register.png';
import  Secret  from '../images/secrect.png';


const Notices = () => {
    return (
        <div>
            {/* ---Navigation Bar--- */}
            {/* <nav className="navbar bg-base-100 bg-gradient-to-r from-blue-500 to-white px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <img src="./images/logo.png" className="h-12 w-8 mr-3 sm:h-9" alt="CU Logo" />
                        <span className="self-center text-2xl text-white font-serif font-bold dark:text-white">University Of Chittagong</span>
                    </a>
                    <div className="flex items-center md:order-2 ">
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full " src="./images/user.png" alt="" />
                        </button>
                       
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">CU_NOC</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">sultanafarhana55@gamil.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </nav> */}

            {/* ---Main section--- */}
            <main>
                <div className="w-full md:w-3/5 md:h-4/5 p-4 mt-16 mx-auto bg-sky-900 border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-3 text-base font-semibold text-sky-300 dark:text-gray-400 md:text-xl text-white">
                        Select Required Departments To Assign Task
                    </h5>
                    <p className="text-sm font-normal text-sky-300 dark:text-gray-400">Department / Register / Office</p>
                    <ul className="my-4 space-y-3">
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Shovapoti} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">সভাপতি, সংশ্লিষ্ট বিভাগ , চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Editor2} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">হিসাব নিয়ামক, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Library} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">গ্রন্থাগারিক, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={College} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">কলেজ প্রদর্শক, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={ExamCommittee} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">পরীক্ষা নিয়ন্ত্রক, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Architecture} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">প্রধান প্রকৌশলী, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-12 h-8" src={Committee} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">পরিচালক ,পরিকল্পনা ও উন্নয়ন দপ্তর, <br /> চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={DeputyRegister} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">উপ রেজিস্টার (শিক্ষক সেল) <br /> রেজিস্টার অফিস, চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={MedicalOfficer} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">চিফ মেডিকেল অফিসার , চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Register} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">ডেপুটি রেজিস্টার (একাডেমির শাখা) <br /> রেজিস্টার অফিস , চ.বি.</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <img className="w-10 h-10" src={Secret} alt="" />
                                <span className="flex-1 ml-3 whitespace-nowrap">ডেপুটি রেজিস্টার (গোপনীয় শাখা) <br /> রেজিস্টার অফিস , চ.বি</span>
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-sky-50 border-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-800" />
                            </a>
                        </li>
                    </ul>
                    <div>
                        <form className="flex ">
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Assign
                                </span>
                            </button>
                            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Reset
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer section */}
            <footer className="mt-20 footer items-center p-4 bg-gradient-to-r from-black to-blue-500 text-neutral-content">
                <div className="items-center grid-flow-col">
                    <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p>Copyright © 2023 - All right reserved</p>
                </div>
                <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                </div>
            </footer>

        </div>
    );
};

export default Notices;