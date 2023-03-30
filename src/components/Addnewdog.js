import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Addnewdog.css';

export default function Addnewdog(props) {
  const [ dogImage, setDogImage ] = useState('');
  const [ dogs, setDogs ] = useState([]);

  // create a separate state for selected dog ids
  const [ selectedFriends, setSelectedFriends ] = useState([]);

  const formRef = useRef();

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setDogImage(data.message);
      });
  }, []);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('dogData')) || [];
    setDogs(existingData);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const nickname = event.target.elements.nickname.value;
    const age = event.target.elements.age.value;
    const description = event.target.elements.description.value;
    const friends = selectedFriends; // use the selected dog ids

    const existingData = JSON.parse(localStorage.getItem('dogData')) || [];
    const lastId = existingData.length ? existingData[existingData.length - 1].id : -1;

    const dogData = {
      id: lastId + 1,
      name,
      nickname,
      age,
      description,
      friends:friends
    };
    

    const updatedData = existingData.length ? [...existingData, dogData] : [dogData];

    localStorage.setItem('dogData', JSON.stringify(updatedData));
    setDogs(updatedData);
    formRef.current.reset();
    setSelectedFriends([])
  };

  return (
    <>
    <div className='heading'>
    Add New Dog here
    </div>
    <div className='goback'> <Link to="/">Go Back to Home</Link></div>
    
    
      <div className="container">
      
        
        <form className="form1" onSubmit={handleSubmit} ref={formRef}>
          <div className="col-md-6 " style={{ width: "50%" }}>
            <img src={dogImage} className="rounded mx-auto d-bloc" alt="dogimage" />
          </div>
          
          *Name:
          <input type="text" name="name" placeholder='Name...' required/>
          *Nickname:
          <input type="text" name="nickname" placeholder='Nickname....' required />
          *Age:
          <input type="number" name="age" placeholder='Age....' required/>
          <div className="col-md-6" style={{ width: "30%" }}>
            <label htmlFor="exampleFormControlTextarea1" className="form-lable ">Description:  </label>
            <textarea className="form-control my-3" id="description" rows="8" name="description"></textarea>
          </div>
          Select Friends: ctrl+click
          
          
          <select multiple name="friends" value={selectedFriends} onChange={(event) => 
            setSelectedFriends(Array.from(event.target.selectedOptions, (option) => 
            option.value))}>
            
             {dogs.map((dog) => (
  <option key={dog.id} value={dog.id}>
    {dog.name}
  </option>
))}

          </select> 
          <div className="Friendlist my-3">
          <ul>
          Friends:
        {selectedFriends.map((friendId) => {
          const selectedDog = dogs.find((dog) => dog.id === parseInt(friendId));
          return <li key={selectedDog.id}>{selectedDog.name}</li>;
        })}
      </ul>
      </div>
          <input className="btn btn-success my-9" type="submit" value="Submit" ></input>
        </form>
      </div>
    </>
  );
}



































































































































