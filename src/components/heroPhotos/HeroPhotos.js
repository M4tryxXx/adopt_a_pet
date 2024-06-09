import React, { useEffect, useState } from 'react';
import { getPetDetails } from '../../api/petfinder';
import Hero from '../../components/hero';

// Import useParams
import { Link, Outlet, useParams } from 'react-router-dom';
// Import Navigate
import { Navigate } from 'react-router-dom';
import PetDetailsNotFound from '../../pages/petDetailsNotFound';

const HeroPhotos = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {id} = useParams(); // <--- Update me!
  let photosResult = [];

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

  if(data && data.photos.length > 0) {

    for(let i = 0; i < data.photos.length; i++) {
        photosResult.push(
            <article>
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={data.photos[i].medium}
                alt=""
              />
            </div>
        </article>
        )
    }
  }
  console.log(data);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {<PetDetailsNotFound/>}
        </div>
      ) : (
        <div className='hero-photos-container'>
        {photosResult}
        </div>
  )
}
</div>)
};

export default HeroPhotos;
