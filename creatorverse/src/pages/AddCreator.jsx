import { useState } from 'react';
import { supabase } from '../client.js'; // Import supabase client
import { useNavigate } from 'react-router-dom'; // Use navigate to redirect after adding

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Insert the new content creator into the database
    const { data, error } = await supabase
      .from('creators') // Replace 'creators' with your actual table name
      .insert([
        { name, url, description, imageURL }
      ]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      console.log('Creator added successfully:', data);
      navigate('/'); // Redirect to the home page after adding
    }
  };

  return (
    <div>
      <h1>Add a New Content Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>URL: </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>Image URL: </label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
