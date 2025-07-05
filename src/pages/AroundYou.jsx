import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetChartByCountryQuery } from '../redux/services/shazamCore'; // ✅ fixed import

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetChartByCountryQuery(country); // ✅ fixed hook usage

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEO_API_KEY;

        if (!apiKey) {
          console.warn('VITE_GEO_API_KEY is missing in .env');
          setCountry('US'); // fallback
          return;
        }

        const res = await axios.get(
          `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`
        );
        const userCountry = res?.data?.location?.country;
        setCountry(userCountry || 'US');
      } catch (err) {
        console.error('Geo API error:', err);
        setCountry('US'); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  if (loading || isFetching) return <Loader title="Loading songs around you..." />;
  if (error || !data) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="text-[#2ccce4] font-black">({country})</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
