import React, { useEffect, useState } from 'react';
import { getPetDetails } from '../../api/petfinder';
import Hero from '../../components/hero';

// Import useParams
import { Link, Outlet, useParams } from 'react-router-dom';
// Import Navigate
import { Navigate } from 'react-router-dom';
import PetDetailsNotFound from '../petDetailsNotFound';

const PetDetailsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {id} = useParams(); // <--- Update me!

  useEffect(() => {
    async function getPetsData() {
      try {
        const petsData = await getPetDetails(id);
        setData(petsData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getPetsData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {<PetDetailsNotFound/>}
        </div>
      ) : (
        <main>
          <Hero
            image={data.photos[1]?.full || 'https://i.imgur.com/aEcJUFK.png'}
            displayText={`Meet ${data.name}`}
          />
          <div className="pet-detail">
          <Link to={`photos/${id}`}>
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={
                  data.photos[0]?.medium || 'https://i.imgur.com/aEcJUFK.png'
                }
                alt=""
              />
            </div>
            </Link>
            <div>
              <h1>{data.name}</h1>
              <h3>Breed: {data.breeds.primary}</h3>
              <p>Color: {data.colors.primary || 'Unknown'}</p>
              <p>Gender: {data.gender}</p>
              <h3>Description</h3>
              <p>{data.description}</p>
            </div>
            <br/>
          </div>
          

          <Outlet/>
        </main>
      )}
    </div>
  );
};

export default PetDetailsPage;
