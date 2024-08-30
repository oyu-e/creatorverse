import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom'; // Correct import
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import './App.css';
import {supabase} from './client.js';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />,
    },
    {
      path: "add", // Route for adding a creator
      element: <AddCreator />,
    },
    {
      path: "edit/:id", // Route for editing a creator
      element: <EditCreator />,
    },
    {
      path: "view/:id", // Route for viewing a creator
      element: <ViewCreator />,
    },
  ]);

  return element;
}

export default App;
