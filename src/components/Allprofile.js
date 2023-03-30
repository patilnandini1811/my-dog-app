import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AllProfile.css';

export default function AllProfile(props) {
  const { id } = useParams();
  
  const dogData = JSON.parse(localStorage.getItem('dogData')) || [];
  const selectedDog = dogData.find(dog => dog.id === parseInt(id));
  selectedDog.friends = selectedDog.friends || [];
  const [ dogImage, setDogImage ] = useState('');
  const [ isChecked, setIsChecked ] = useState(selectedDog.isPresent || false); 

  
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setDogImage(data.message);
      });
  }, []);
  const handleDogPresentStatusChange = (id, isPresent) => {
    const updatedDogData = dogData.map((dog) => {
      if (dog.id === id) {
        dog.isPresent = isPresent;
        
      }
      return dog;
    });
    localStorage.setItem('dogData', JSON.stringify(updatedDogData));
    
  }
  const handleCheckboxChange = (e) => {
  const updatedDogData = dogData.map(dog => {
    if (dog.id === parseInt(id)) {
      dog.isPresent = e.target.checked;
    }
    return dog;
  });
  localStorage.setItem('dogData', JSON.stringify(updatedDogData));
  if (e.isTrusted) { // only update isChecked if checkbox is clicked by user
    setIsChecked(e.target.checked);
    handleDogPresentStatusChange(id, e.target.checked);
    
  }
};
  
  
  

  

  const getNameById = (id) => {
    const friend = dogData.find((dog) => dog.id === parseInt(id));
    return friend ? friend.name : '';
  }

  return (
    <>
    <div className='profilehere my-3'>
    Dog's Profile here</div>
      {selectedDog && (
        <div className="profile-container">
        <div className='homelink'>
            <Link to="/">
             Back to Home</Link> 
            
            <div className='editlink'>
            <Link to={`/editdog/${id}`}>Edit</Link>
            </div>
            </div>
          <div className='image-container'>
            <img src={dogImage} className="profile-image" alt="dog-profile" />
            </div>
            
            
            <input className="checkbox"style={{backgroundColor: isChecked ? 'green': 'red'}}
            type="checkbox" 
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label style={{color: isChecked ? 'green' : 'red'}}>Present</label>
            
          <div className='formprofile'>
          <p>Name -    {selectedDog.name}</p><br />
          <p>Nickname-  {selectedDog.nickname}</p><br />
          <p>Age-   {selectedDog.age}</p><br />
          <p>Bio-  {selectedDog.description}</p><br />
          {selectedDog.friends && selectedDog.friends.length > 0 && (
            <div className='friends'>
               Friends:
              {selectedDog.friends.map(friendId => (
                <div key={friendId}>
                  <Link to={`/dog/${friendId}`}>{getNameById(friendId)}</Link>
                  
                </div>
              ))}
            </div>
            
          )}
        </div>
        </div>
      )}
    </>
  )
}















































// // import React, { useState, useEffect } from 'react';

// // const ProfilePage = ({ dog }) => {
// //   const [ image, setImage ] = useState('');

// //   useEffect(() => {
// //     fetch('https://dog.ceo/api/breeds/image/random')
// //       .then(response => response.json())
// //       .then(data => setImage(data.message))
// //       .catch(error => console.log(error));
// //   }, []);

// //   return (
// //     <div>
// //       <img src={image} alt="Dog" />
// //       <h2>{dog.name}</h2>
// //       <p>{dog.nickname}</p>
// //       <p>{dog.age}</p>
// //       <p>{dog.description}</p>
// //       <ul>
// //         {dog.friends.map((friend, index) => (
// //           <li key={index}>{friend}</li>
// //         ))}
// //       </ul>
// //       <label>
// //         <input type="checkbox" checked={dog.isChecked} />
// //         isChecked
// //       </label>
// //     </div>
// //   );
// // };

// // export default ProfilePage;

