import { useEffect, useState } from 'react'; // Import React hooks
import { supabase } from '../client.js'; // Import supabase client
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card'; // Import Card component

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addClick = () => {
    // Add your button click logic here
    console.log('Button!');
    navigate('/add')
  };
  const deleteClick = async (id) => {
    // Confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this creator?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('creators') 
        .delete()
        .eq('id', id); 

      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        // Update the state to remove the deleted creator
        setCreators((prevCreators) => prevCreators.filter((creator) => creator.id !== id));
        console.log('Creator deleted successfully');
      }
    } catch (error) {
      console.error('Unexpected error deleting creator:', error);
    }
  };

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators') // Replace 'creators' with your actual table name
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data); // Set the fetched creators data
      }
      setLoading(false);
    };

    fetchCreators();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  return (
    <div className="show-creators">
        <button onClick={addClick}>Add a creator!</button>

        
      <h1>All Content Creators</h1>
      <div className="creator-list">
        {creators.length === 0 ? (
          <p>No content creators found.</p> // Display this message if creators array is empty
        ) : (
          creators.map((creator, index) => (
            <div key={index} className="creator-card">
              <Card
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
              />
              <button onClick={() => deleteClick(creator.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
