import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {
  useGetTrackDetailsQuery,
  useGetTracksRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: relatedSongs, isFetching: isFetchingRelatedSongs, error } = useGetTracksRelatedQuery(songid);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetTrackDetailsQuery(songid);

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details..." />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections?.[1]?.type === 'LYRICS'
            ? songData.sections[1].text.map((line, i) => (
                <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">
                  {line}
                </p>
              ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
            )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
