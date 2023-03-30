import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Edit.css';
export default function EditDog(props) {
  const [ dogImage, setDogImage ] = useState('');
  const { id } = useParams();
  const dogData = JSON.parse(localStorage.getItem('dogData')) ||[];

  const selectedDog = dogData.find(dog => dog.id === parseInt(id));
  const [ name, setName ] = useState(selectedDog.name);
  const [ nickname, setNickname ] = useState(selectedDog.nickname);
  const [ age, setAge ] = useState(selectedDog.age);
  const [ description, setDescription ] = useState(selectedDog.description);
  
  const [ selectedFriends, setSelectedFriends ] = useState(selectedDog.friends);
  
  
  const handleChange = (event) => {
    
    const options = event.target.options;
   
    
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[ i ].selected) {
        selectedValues.push(options[ i ].value);
      }
    }
    
    setSelectedFriends(selectedValues);
  };

  const formRef = useRef(null);

  

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setDogImage(data.message);
      });
  }, []);

  const handleUpdateDog = () => {
    
    const updatedDogData = dogData.map(dog => {
      
      if (dog.id === parseInt(id)) {
        return {
          id: dog.id,
          name: name,
          nickname: nickname,
          age: age,
          description: description,
           friends: selectedFriends,
           isPresent:dog.isPresent
          };
      } else {
        
        return dog;
      }
    });
    
    localStorage.setItem('dogData', JSON.stringify(updatedDogData));
   
  };

  


  return (
    <>
    <div className='edithere my-3'>
     Edit Here
    </div>
      <div className="container">
        <div className="row1">
          <div className="col-md-12 my-3">
            <div className='goback1'> <Link to="/">Go Back to Home</Link></div>
            <h3>Edit Dog Profile</h3>
            <form className="form"ref={formRef} onSubmit={handleUpdateDog}>
              <div className="col-md-6 " style={{ width: "50%" }}>
                <img src={dogImage} className="rounded mx-auto d-bloc" alt="dogimage" /></div>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  length="50"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickname">Nickname:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}/></div>
              
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Bio:</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}></textarea>
              </div>
              
              <div className="form-group">
              Add dog friend:
              
                <select multiple name="friends" value={selectedFriends} onChange={handleChange}>
                
                  {dogData.map((friends) => (
                    <option key={friends.id} value={friends.id}>
                     {friends.name}
                   
                     </option> 
                   
                    ))}
                    
                  
                </select>
                
              </div>
              <div className='MyfriendList'>
              <ul>
              Friends:
              {selectedFriends.map((friendId) =>{
                const selectedDog=dogData.find((dog)=> dog.id===parseInt(friendId));
                 if (!selectedDog) return <li key={friendId}></li>;
                  
                return( 
                <li key={selectedDog.id}>
                <Link to ={`/dog/${selectedDog.id}`}>@{selectedDog.name}</Link>
                </li>
                );
              })}
              </ul></div>
</form>
              
           
            <button className="btn btn-primary" onClick={handleUpdateDog}>Update</button>
            <Link to={`/dog/${id}`} className="btn btn-primary ml-3">Cancel</Link>
            
          </div>
        </div>
      </div>
    </>
  );
}







  
      

  

























