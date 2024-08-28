"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AddUser() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [address, setAddress] = useState("");
    const [is_active, setStatus] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const router = useRouter();

    const addUserForm = (e) => {
        addUser(e, username, password, name, role, phone_number, 
            address, is_active, setIsMutating, setUsername, setPassword,
            setName, setRole, setPhone_number, setAddress, setStatus, router, setModal);
    }

    function handleChange()
    {
        setModal(!modal);
    }

  return (
   <div>
        <button className="btn" onClick={handleChange}>
            Add
        </button>
    <input 
        type="checkbox" 
        checked={modal} 
        onChange={handleChange} 
        className="modal-toggle"
    />

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Add New user
                </h3>

                <form onSubmit={addUserForm}>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Your Name"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Username"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input w-full input-bordered pr-10"
                                placeholder="Enter Password"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                            > {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-control mt-3 ">
                        <label className="label font-bold">
                            Role
                        </label>
                        <div className="flex items-center relative">
                        
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                                className="input w-full input-bordered pr-8">

                                    <option value="">Select Role</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Admin">Admin</option>
                                    <option value="cashier">Cashier</option>
                            </select>

                            <div className="pointer-events-none flex items-center absolute inset-y-0 right-0 pr-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                                    />
                                </svg>
                            </div>

                        </div>
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            value={phone_number}
                            onChange={(e) => setPhone_number(e.target.value)}
                            min="0"
                            className="input w-full input-bordered"
                            placeholder="Enter Phone Number"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Address"
                        />
                    </div>

                    <div className="form-control mt-3 ">
                        <label className="label font-bold">
                            Status
                        </label>
                        <div className="flex items-center relative">
                        
                            <select 
                                value={is_active} 
                                onChange={(e) => setRole(e.target.value)}
                                className="input w-full input-bordered pr-8">

                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Non-Active</option>
                            </select>

                            <div className="pointer-events-none flex items-center absolute inset-y-0 right-0 pr-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">
                            Save
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                            Saving...
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
   </div>
  );
}
