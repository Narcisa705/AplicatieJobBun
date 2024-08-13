import React, { useEffect, useState } from 'react';

const WorkGrid = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/work/status/visible')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        const worksWithBase64Images = data.map(work => ({
          ...work,
          image: arrayBufferToBase64(work.image.data),
        }));
        setWorks(worksWithBase64Images);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the works!', error);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  return (
    <div className="work-grid">
      <h1>Gallery</h1>
      <div className="grid-container">
        {works.map(work => (
          <div key={work.id} className="grid-item">
            <div className="work-image-container">
              <img src={`data:image/jpeg;base64,${work.image}`} alt={work.title} className="work-image" />
            </div>
            <div className="work-info">
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <a href={work.clientUrl} target="_blank" rel="noopener noreferrer" className="client-url-link">
                {work.clientUrl}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGrid;
