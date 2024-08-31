import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to get the URL parameter
import { supabase } from '../client.js'; // Import supabase client
import { useNavigate } from 'react-router-dom'

const ViewCreator = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const editClick = () => {
    // Add your button click logic here
    console.log('Button!');
    navigate(`/edit/${id}`)
  };

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators') // Replace 'creators' with your actual table name
        .select('*')
        .eq('id', id) // Filter to get the specific creator by ID
        .single(); // Use single() to get a single record

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data); // Set the creator data
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]); // Dependency array includes 'id' to refetch if the ID changes

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  if (!creator) {
    return <p>No content creator found.</p>; // Show this if no creator is found
  }

  return (
    <div className="view-creator">
      <div className="creator-header">
        <h1 className="creator-name">{creator.name}</h1>
        <button className="edit-button" onClick={editClick}>Edit</button>
      </div>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} className="card-image" />}
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit {creator.name}'s page
      </a>
      <br/>
      <a href='/'>Go back</a>
    </div>
  );
};

export default ViewCreator;
