import { useState } from 'react';
import { useGetWorldChartByGenreQuery } from '../redux/services/shazamCore';

import { genres } from '../assets/constants';
import { Error, Loader, SongCard } from '../components';

const Discover = () => {
  const [genreTitle, setGenreTitle] = useState('Pop');
  const [selectedGenre, setSelectedGenre] = useState('POP');

  const { data, isFetching, error } = useGetWorldChartByGenreQuery(selectedGenre);

  const handleGenreChange = (e) => {
    const selectedValue = e.target.value;
    const selectedGenreObj = genres.find((genre) => genre.value === selectedValue);

    setSelectedGenre(selectedValue);
    setGenreTitle(selectedGenreObj?.title || 'Music');
  };

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error || !data) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover <span className="text-[#2ccce4]">{genreTitle}</span>
        </h2>

        <select
          onChange={handleGenreChange}
          value={selectedGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) =>
          song?.key ? (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              data={data}
              isPlaying={false}
              activeSong={null}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Discover;
