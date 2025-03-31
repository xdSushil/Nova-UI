import axios from 'axios'
import React, { useEffect } from 'react'

function UserById(userId) {
    useEffect(()=>{
        const fetchUserbyId = async () => {
            try{
                const response = await axios.get(`http://localhost:4000/api/users/currentUser/${userId}`)
                return response
            }catch(error){
                console.log("Error fetching user by id in UserById component",error)

            }
        }
        fetchUserbyId();
    },[userId])
}

export default UserById