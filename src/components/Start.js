

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Start(props) {
  const [ dogData, setDogData ] = useState(JSON.parse(localStorage.getItem('dogData')) || []);

  const handleRemoveDog = (id) => {
    const updatedDogData = dogData.filter(dog => dog.id !== id);
    localStorage.setItem('dogData', JSON.stringify(updatedDogData));
    setDogData(updatedDogData);
  }
  

  return (
    <>
      <div className="hcontainer">
        <div className="row">
          <div className="col-md-12 my-3">
            <h3>Dog's Kind Daycare Center</h3>
            <div className="image-container">
              <img
                src={process.env.PUBLIC_URL + '/doggi.jpg'}
                alt="logo"
                className="logo" />
            </div>
             <ul>
              {dogData.map((dog) => (
                <li key={dog.id}>
                <Link to={`/dog/${dog.id}`} style={{color: dog.isPresent ? 'green' : 'red'}}> 
                 {dog.name}</Link> 
                  
                  <div className="remove">
                    <button className="remove-button my-2" onClick={() => 
                     handleRemoveDog(dog.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/addnewdog">Add New Dog</Link>
          </div>
        </div>
      </div>
      <div className='image'>
    <img className='img'
                src={process.env.PUBLIC_URL + '/doggi1.jpg'}
                alt="logo1"
                 />
                 <img className='img'
                src={process.env.PUBLIC_URL + '/doggi2.jpg'}
                alt="logo1"
                 />
                 <img className='img'
                src={process.env.PUBLIC_URL + '/doggi3.jpg'}
                alt="logo1"
                 />
                 <img className='img'
                src={process.env.PUBLIC_URL + '/doggi4.jpg'}
                alt="logo1"
                 />
    </div>
    </>
  );
}





















