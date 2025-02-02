"use client"

import { useState } from "react";
import Image from "next/image";
import NavbarAdmin from "../components/Navbar";

export default function AdminProfile() {
    const [username, setUsername] = useState("asdasd");
    const [email, setEmail] = useState("asdad@asda.asda");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("asda");
    const [country, setCountry] = useState("ddd");
    const [postalCode, setPostalCode] = useState("");

    return (
        <div className="w-screen">
            <div className="ml-56 pb-10">
                <NavbarAdmin />
            </div>

            {/* Layout dengan 2 Kolom */}
            <div className="bg-white shadow-lg rounded-lg p-6 ml-56 mr-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Kolom Kiri - User & Contact Information */}
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">My Account</h2>
                        <button className="btn">Settings</button>
                    </div>

                    {/* User Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input type="text" className="input input-bordered w-full" value={username} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input type="email" className="input input-bordered w-full" value={email} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input type="text" className="input input-bordered w-full" value={firstName} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input type="text" className="input input-bordered w-full" value={lastName} readOnly />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <h2 className="text-lg font-semibold pt-10">Contact Information</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Address (Full Width) */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium">Address</label>
                            <input type="text" className="input input-bordered w-full" value={address} readOnly />
                        </div>
                        {/* City, Country, Postal Code (Sejajar dalam 3 kolom) */}
                        <div>
                            <label className="block text-sm font-medium">City</label>
                            <input type="text" className="input input-bordered w-full" value={city} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country</label>
                            <input type="text" className="input input-bordered w-full" value={country} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Postal Code</label>
                            <input type="text" className="input input-bordered w-full" value={postalCode} readOnly />
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan - Profile Card */}
                <div className="p-6 border rounded-lg flex flex-col items-center bg-gray-50">
                <h3 className="mt-4 mb-6 text-xl font-bold">Employee Card</h3>
                    <Image src="/logos/icon-user.png" alt="Profile Picture" width={100} height={100} className="rounded-full" />
                    <h3 className="mt-4 text-xl font-bold">{username}</h3>
                    <p className="text-sm text-gray-600">{email}</p>
                    <p className="text-gray-500">{city}, {country}</p>
                    {/* <div className="mt-4 flex gap-4">
                        <button className="btn btn-primary">Connect</button>
                        <button className="btn btn-outline">Message</button>
                    </div> */}
                </div>

            </div>
        </div>
    );
}
