import React, { useEffect, useRef, useState } from "react";
import Pill from "./Pill";

function SearchTerm (){
    const [searchTerm,setSearchTerm] = useState("");
    const [ActiveSuggestion,setActiveSuggestion] = useState(0);
    const [suggestions,setSuggestions] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [selectedUserSet,setSelectedUserSet] = useState(new Set());
     const inputRef = useRef(null);


    useEffect(()=>{
        const fetchUsers = async ()=>{
            if(searchTerm.trim() === ""){
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try{
               const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
               if(!response.ok){
                throw new Error ('failed to fetch data')
               }
               const data = await response.json();
               setSuggestions(data);
            }catch (err){
                setError(err);
            }finally {
                setLoading(false);
            }
        };
        fetchUsers();

    },[searchTerm]);

    const handleSelectUser = (user)=>{
        setSelectedUsers([...selectedUsers,user]);
        setSelectedUserSet(new Set([...selectedUserSet,user.email]));
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    }
    const handleRemoveUser = (user)=>{
        const updatedUsers = selectedUsers.filter(selectedUsers.id !== user.id)
            setSelectedUsers(updatedUsers);
        
        const updatedEmails = new Set(selectedUserSet);
          updatedEmails.delete(user.email);
          setSelectedUserSet(updatedEmails);

        }
        const handleKeyDown = (e)=>{
            if(e.key === "Backspace" && e.target.value === "" && selectedUsers.length > 0 ){
                const lastUser = selectedUsers[selectedUsers.length -1 ];
                handleRemoveUser(lastUser);
                setSuggestions([]);

            }else if (e.key === "ArrowDown" && suggestions?.users?.length>0){
                e.preventDefault();
                setActiveSuggestion((prevIndex)=>
                prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
                )
            }else if  (e.key === "ArrowUp" && suggestions?.users?.length >0 ){
                 e.preventDefault();
                 setActiveSuggestion((prevIndex)=>
                 prevIndex < suggestions.users.length -1 ? prevIndex + 1 : prevIndex
                 )

            }else if (
                e.key === "Enter" &&
                ActiveSuggestion >= 0 && 
                ActiveSuggestion < suggestions.users.length 
            ) {
                handleSelectUser(suggestions.users[ActiveSuggestion])
            }
        }


    return (
        <div className="user-search-container">
            <div className="user-search-input">
                {/* pills */}
                {selectedUsers.map((user)=>{
                    return <Pill key={user.email}
                    image={user.image}
                    text={`${user.firstName} ${user.lastName}`}
                    onClick={()=>handleRemoveUser(user)}
                    />
                })
                }
                <div>
                    <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search for a User" ref={inputRef} />
                </div>
                {
                    loading && <p>Loading...</p>
                }
                {error && <p>Error: {error.message}</p>}
                <ul className="suggestions-list">
                   {suggestions && suggestions.users && suggestions.users.map((user,index)=>{


                       return !selectedUserSet.has(user.email) ? (
                          <li
                          key={user.email} onClick={()=>handleSelectUser(user)}
                          >
                          <img src={user.email} alt={`${user.firstName} ${user.lastName}`} />
                          <span>
                            {user.firstName} {user.lastName}
                          </span>

                          </li>


                       ):(
                        <>
                        </>
                       )
                   }
                )}
                </ul>
            </div>

        </div>
    )
}

