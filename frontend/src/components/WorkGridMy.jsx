import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GalleryGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/work')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const itemsWithBase64Images = data.map(item => ({
          ...item,
          image: arrayBufferToBase64(item.image.data),
          status: item.status || 'visible', 
        }));
        setItems(itemsWithBase64Images);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const toggleItemVisibility = async (id) => {
    try {
      // Schimbă statusul local al elementului
      const updatedItems = items.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'visible' ? 'hidden' : 'visible' } 
          : item
      );
      setItems(updatedItems);

      
      const response = await fetch(`http://localhost:3001/work/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was an error updating the item status!', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      
      const response = await fetch(`http://localhost:3001/work/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Actualizează starea locală pentru a elimina itemul șters
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  return (
    <div className="gallery-grid">
      <div className="add-work-container">
        <Link to="/mypage/mywork" className="add-work-link">
          Add New Work
        </Link>
      </div>
      <h1>Works</h1>
      <div className="gallery-container">
        {items.map(item => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-image-container">
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} className="gallery-image" />
            </div>
            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a 
  href={item.clientUrl} 
  target="_blank" 
  rel="noopener noreferrer" 
  style={{
    display: 'block', 
    wordBreak: 'break-word', 
    overflowWrap: 'break-word', 
    textDecoration: 'none', 
    color: '#808080', 
    fontFamily: 'Dancing Script', 
  }}
 
>
  {item.clientUrl}
</a>

            </div>
            <div className="gallery-controls">
              <button onClick={() => toggleItemVisibility(item.id)}>
                {item.status === 'visible' ? 'Hide' : 'Show'} Item
              </button>
              <button onClick={() => deleteItem(item.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
