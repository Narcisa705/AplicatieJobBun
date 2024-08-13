import React, { useEffect, useState } from 'react';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        
        const response = await fetch('http://localhost:3001/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        
        const clientsWithWorks = await Promise.all(
          data.map(async (client) => {
            try {
              const worksResponse = await fetch(`http://localhost:3001/work/user/${client.id}`);
              if (!worksResponse.ok) {
                throw new Error('Network response was not ok');
              }
              const worksData = await worksResponse.json();
              console.log(`Received works for client ${client.id}:`, worksData);
              return { ...client, works: worksData };
            } catch (error) {
              console.error(`Error fetching works for client ${client.id}:`, error);
              return { ...client, works: [] };
            }
          })
        );

        setClients(clientsWithWorks);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="client-table-container">
      <h1>Client Table</h1>
      <table className="client-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Works</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email || 'No email'}</td>
                <td>
                  {client.works && client.works.length > 0 ? (
                    client.works.map((work) => (
                      <div key={work.id}>{work.title}</div>
                    ))
                  ) : (
                    'No works'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No clients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
