import React, { useEffect, useRef, useState } from 'react';
import { users } from '../constants';
import bg from "../utils/benner_11.jpg"

const Chip = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState(users);
  const [findUsers, setFindUsers] = useState(allUsers);
  const [usersVisibility, setUsersVisibility] = useState(false);
  const userScrollRef = useRef(null);
  const inputRef = useRef(null);


  function handleClick(clickedUser) {
    setSelectedUsers((prevUsers) => {
      const isUserExists = prevUsers.some((user) => user.id === clickedUser.id);
      if(isUserExists){
        return prevUsers.filter((user)=>user.id !== clickedUser.id);
      }
     const newUsers = findUsers.filter((user) => user?.id !== clickedUser?.id);
      setFindUsers(newUsers);
      setSearchText("");
      return [...prevUsers, clickedUser];
    });
  }
  function removeUser(clickedUser){
    const remainingUsers = selectedUsers.filter((user)=>user?.id !== clickedUser?.id);
    const isUserExistsInAllusers = findUsers.some((user)=>user?.id === clickedUser?.id);
    if(!isUserExistsInAllusers){
      setFindUsers((prevUsers)=>[...prevUsers, clickedUser]);
    }
    setSelectedUsers(remainingUsers);
  }

  function handleInput(e) {
    const value = e.target.value;
    setSearchText(value)
    setUsersVisibility(true);
  }
  function handleFocus (){
    setUsersVisibility(true);
  }
  useEffect(() => {
    searchUsers();
  }, [searchText]);

   useEffect(() => {
    const handleClickOutside = (event) => {
         if (userScrollRef.current && inputRef.current && !userScrollRef.current.contains(event.target) && !inputRef.current.contains(event.target) ) {
             setUsersVisibility(false);
    }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userScrollRef, inputRef]);
  
  function searchUsers() {
    const lowerCaseSearchText = searchText.toLowerCase();
    const searchedUsers = allUsers.filter(
      (user) => user.name.toLowerCase().includes(lowerCaseSearchText) && !selectedUsers.includes(user)
    );
    setFindUsers(searchedUsers);
  }
  

  return (
    <div >
    <div className=" -z-10 absolute h-full ">
        <img src={bg }alt="bg-theme" className=' h-full' /> 
    </div>      
    <div  className= ' z-20  flex justify-center mt-[5rem]'>
    <div
  onFocus={() => setUsersVisibility(true)}
  className='flex flex-wrap w-[90%] md:w-[80%] lg:w-[65%] text-lg p-2 rounded-[5px] focus:outline-none px-3 border-[1px] border-gray-300 transition-all duration-300 hover:shadow-md focus:shadow-outline'
>
        {selectedUsers.length !== 0 ? selectedUsers.map((user)=>{
          return (
            <div  key={user.id} className=' flex items-center px-1 py-1  rounded-lg my-1 bg-slate-200 mr-1'>
          <img className=' w-[0.8rem] rounded-full h-[0.8rem] mr-1' src= {user.profile}/>
          <span className=' text-xs text-gray-700'>{user.name}</span>
          <button onClick={()=>{
            removeUser(user)
          }} className=' mx-1 px-[0.3rem]  text-xs bg-slate-400 rounded-full '>x</button>
          </div>)
        }) : <></>}

        <input
          ref={ inputRef}
          value={searchText}
          onFocus={handleFocus}
          onChange={(e) =>handleInput(e)}
          className='outline-none border-none w-full md:w-4/5 lg:w-1/3 '
          placeholder='Search by email or name'/>

          </div>
        </div>
     { usersVisibility && <div
      ref={userScrollRef}
     className='
     transition-all duration-200 hover:shadow-md focus:shadow-outline
     bg-white opacity-80 ml-[2rem] lg:ml-[14rem] md:ml-[4.7rem]   rounded-md w-[85%] md:w-[40%] lg:w-[30%] max-h-[25rem] overflow-y-scroll mt-2 '>
      {findUsers.map((user) => (
        <div className='
        transition-all duration-200 hover:shadow-md focus:shadow-outline rounded-sm
        flex items-center py-2 px-1 gap-1 cursor-pointer' 
          onClick={()=>{handleClick(user)
          }}
          key={user.id}>
        <img className=' rounded-full w-[2.2rem] h-[2.2rem]' src={user.profile} alt={user.name} />
        <h1 className= ' font-semibold  '>{user.name}</h1>
        <h1 className=' text-xs  text-gray-500 '>{user.email}</h1>
        </div>
      ))}
      </div> }
      
    </div>
    
  );
};

export default Chip;
