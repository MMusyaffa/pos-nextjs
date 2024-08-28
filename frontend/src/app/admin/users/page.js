"use client"

import { useEffect, useState } from "react";
import { getUser } from "@/api/user";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";

// export const metadata = {
//     title: "Product List",
//   };

export default function UsersList() 
{
    const [getUsers, setGetUsers] = useState([]);

    useEffect(()=> {
        getUser()
            .then( function (tit) {setGetUsers(tit)
            })

    }, []);
    
    return (
        // <div className="flex">
        //     <SideBarAdmin />

            <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
                <div className="py-2 pt-8">
                    <AddUser/>
                </div>
                
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getUsers.map((user, index) => 
                        (
                            <tr key = {user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.address}</td>
                                <td>{user.is_active === 1 ? 'Active' : 'Non-Active'}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <UpdateUser {...user}/>
                                    </div>
                                        <DeleteUser {...user}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        //</div>
    );
} 