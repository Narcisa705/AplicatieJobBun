import React, { useState } from 'react';

const AddWorkForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !link || !email) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    try {
      
      const userResponse = await fetch(`http://localhost:3001/users/email/${email}`);

      if (userResponse.status === 404) {
        
        setUserDetailsVisible(true);
      } else if (userResponse.ok) {
        
        const user = await userResponse.json();
        
        
        await addWork(user.id);
      } else if (userResponse.status >= 500) {
        
        
        console.error('Server error:', await userResponse.text());
        setUserDetailsVisible(true); 
      } else {
        // Other unexpected status codes
        const errorResponse = await userResponse.json();
        setErrorMessage(`Error: ${errorResponse.message}`);
        console.error('Unexpected error:', errorResponse);
      }
    } catch (error) {
      setErrorMessage('Error checking user existence.');
      console.error('Error checking user existence:', error);
    }
  };

  const addWork = async (userId) => {
   
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('clientUrl', link);
    formData.append('status', 'hidden');
    formData.append('userId', userId);
    
    

    try {
      const response = await fetch('http://localhost:3001/work', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 400 && errorResponse.message.includes('duplicate')) {
          setErrorMessage('A work with this title already exists.');
        } else {
          setErrorMessage('Error adding work.');
        }
        return;
      }

      const result = await response.json();
      setSuccessMessage('Work added successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setLink('');
      setEmail('');
      setPassword('');
      setUserName('');
      setUserDetailsVisible(false); 
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('There was an error adding the work.');
      console.error('There was an error adding the work:', error);
    }
  };

  const handleUserCreation = async () => {
    if (!userName || !email || !password) {
      setErrorMessage('Please fill out all required fields to create a user.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email, password }), 
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setErrorMessage(`Error: ${errorResponse.message}`);
        console.error('Error creating user:', errorResponse);
        return;
      }

      const user = await response.json();
      await addWork(user.id);
    } catch (error) {
      setErrorMessage('Error creating user.');
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="add-work-form-container">
      <h1>Add New Work</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="add-work-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="form-file-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Add Work</button>
      </form>

      {userDetailsVisible && (
        <div className="user-details-container">
          <h2>Create New User</h2>
          <div className="form-group">
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newEmail">Email:</label>
            <input
              type="email"
              id="newEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button onClick={handleUserCreation} className="submit-button">Create User and Add Work</button>
        </div>
      )}
    </div>
  );
};

export default AddWorkForm;
