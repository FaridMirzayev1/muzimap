import axios from 'axios';

export const getRecommendations = async (artistIds, accessToken, set) => {
  if (!Array.isArray(artistIds) || artistIds.length < 3) {
    console.error('Minimum 3 artist seçilməlidir');
    return [];
  }

  if (!accessToken) {
    console.error('Access token yoxdur');
    return [];
  }


  artistIds.map(id => {
    getTopTracks(id, accessToken, set)
  })



  

  
};

export default getRecommendations;


async function getTopTracks(artistId, accessToken, list) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`

  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { market: 'US' }, 
    });

    set(prev => [...prev, ...res.data.tracks]);

  } catch (err) {
    console.error('❌ Error fetching top tracks:', err.response?.data || err.message);
    return [];
  }
}