import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '61253072famsh50a8cc28e1f1e31p106012jsn94ba8b7b26c2');
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Charts
    getTopCharts: builder.query({
      query: () => 'charts/world',
    }),

    // ✅ Songs
    getTrackDetails: builder.query({
      query: (trackId) => `tracks/details?track_id=${trackId}`,
    }),
    getV2TrackDetails: builder.query({
      query: (trackId) => `v2/tracks/details?id=${trackId}`,
    }),
    getTracksRelated: builder.query({
      query: (trackId) => `tracks/related?track_id=${trackId}`,
    }),
    getTrackYoutubeVideo: builder.query({
      query: (trackId) => `tracks/youtube-video?id=${trackId}`,
    }),
    getTrackSimilarities: builder.query({
      query: (trackId) => `tracks/similarities?id=${trackId}`,
    }),
    getTotalShazams: builder.query({
      query: (trackId) => `tracks/count?id=${trackId}`,
    }),

    // ✅ Artists
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),

    // ✅ Search
    getSearchSuggestions: builder.query({
      query: (query) => `search/suggest?query=${query}`,
    }),
    getMultiSearch: builder.query({
      query: (query) => `search/multi?query=${query}`,
    }),

    // ✅ Charts by filters
    getChartByCity: builder.query({
      query: (cityId) => `charts/city?id=${cityId}`,
    }),
    getChartByGenreAndCountry: builder.query({
      query: ({ genre, country }) => `charts/genre-country?genre_code=${genre}&country_code=${country}`,
    }),
    getWorldChartByGenre: builder.query({
      query: (genre) => `charts/genre-world?genre_code=${genre}`,
    }),
    getChartByCountry: builder.query({
      query: (countryCode) => `charts/country?country_code=${countryCode}`,
    }),
    getSchemaCitiesGenres: builder.query({
      query: () => 'charts/cities',
    }),

    // ✅ Events
    getEventsDetails: builder.query({
      query: (eventId) => `events/details?event_id=${eventId}`,
    }),
    getEventsList: builder.query({
      query: () => 'events/list',
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTrackDetailsQuery,
  useGetV2TrackDetailsQuery,
  useGetTracksRelatedQuery,
  useGetTrackYoutubeVideoQuery,
  useGetTrackSimilaritiesQuery,
  useGetTotalShazamsQuery,
  useGetArtistDetailsQuery,
  useGetSearchSuggestionsQuery,
  useGetMultiSearchQuery,
  useGetChartByCityQuery,
  useGetChartByGenreAndCountryQuery,
  useGetWorldChartByGenreQuery,
  useGetChartByCountryQuery,
  useGetSchemaCitiesGenresQuery,
  useGetEventsDetailsQuery,
  useGetEventsListQuery,
} = shazamCoreApi;
