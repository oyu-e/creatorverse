import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client.js'; // Import supabase client

const EditCreator = () => {
  const { id } = useParams(); // Get the creator ID from the URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      // Ensure ID is valid
      const creatorId = parseInt(id, 10); // Convert ID to integer
      if (isNaN(creatorId)) {
        console.error('Invalid ID: ', id);
        return;
      }

      const { data, error } = await supabase
        .from('creators') // Replace with your actual table name
        .select('*')
        .eq('id', creatorId)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure ID is valid
    const creatorId = parseInt(id, 10); // Convert ID to integer
    if (isNaN(creatorId)) {
      console.error('Invalid ID:', id);
      return;
    }

    // Update the creator data in the database
    const { error } = await supabase
      .from('creators')
      .update({ name, url, description, imageURL })
      .eq('id', creatorId);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/view/${id}`); // Redirect to the view page after saving changes
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-creator">
      <h1>Edit {name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCreator;
