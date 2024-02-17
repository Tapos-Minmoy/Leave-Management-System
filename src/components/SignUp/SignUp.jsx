// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (password !== passwordConfirm) {
            return setError("Passwords do not match!");
        }
        // Here you can add your logic for sign up, like sending a request to the server
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white mb-4">Sign UP</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block font-medium text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block font-medium text-white">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                            placeholder="••••••••"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="roles" className="block font-medium text-white">Working Department:</label>
                        <select
                            id="roles"
                            className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-yellow-300"
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="applicant">Computer Science And Engineering</option>
                            <option value="evaluator">Electrical And Electronic Engineering </option>
                        </select>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 pr-2">
                            <label htmlFor="first-name" className="block font-medium text-white">First Name:</label>
                            <input
                                type="text"
                                id="first-name"
                                className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label htmlFor="last-name" className="block font-medium text-white">Last Name:</label>
                            <input
                                type="text"
                                id="last-name"
                                className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-blue-400 hover:bg-blue-500 rounded focus:ring focus:ring-blue-300"
                        >
                            Sign UP
                        </button>
                    </div>

                    <p className="text-sm text-white">
                        Already have an account? <Link to="../Login" className="font-medium hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
