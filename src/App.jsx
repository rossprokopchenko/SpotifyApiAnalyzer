import React from 'react';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import LoginPage from './components/LoginPage';
import Footer from './components/footer/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { useNavigate, Route, Routes } from "react-router-dom";

function App() {
    const [token, setToken] = useState("");

    const CLIENT_ID = "ce1dff647ef6413ebee5c2e68552730b";
    // "http://www.spotilyzer.com" "https://jade-centaur-bfff2c.netlify.app" "http://localhost:3000"
    const REDIRECT_URI = "http://www.spotilyzer.com";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SPOTIFY_API = "https://api.spotify.com/v1";
    const DEFAULT_TIME_RANGE = "medium_term";
    const RESPONSE_TYPE = "token";
    const SCOPE = "user-read-currently-playing user-top-read user-read-recently-played user-library-read";

    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [recentTracks, setRecentTracks] = useState([]);
    const [topGenres, setTopGenres] = useState(new Map());
    const [savedAlbums, setSavedAlbums] = useState([]);
    const [savedAlbumsIds, setSavedAlbumsIds] = useState([]);
    const [profile, setProfile] = useState("");
    const [currentTrack, setCurrentTrack] = useState("");
    const [recommendedAlbums, setRecommendedAlbums] = useState([]);
    const [recommendedTracks, setRecommendedTracks] = useState([]);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [timer, setTimer] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        
        setTimer(parseInt(window.localStorage.getItem("expiresIn")));

        if (!token && hash) {
            let now = new Date();

            let expiresInSeconds = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];
            let expiresInDate = dayjs(now).add(expiresInSeconds, 'seconds').toDate();
            setTimer(expiresInDate.getTime());

            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("expiresIn", expiresInDate.getTime());
        }

        axios.defaults.baseURL = SPOTIFY_API;
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers['Content-Type'] = 'application/json';

        setToken(token);

        getSavedAlbums(50);

        getProfile();
        getArtists(DEFAULT_TIME_RANGE);
        getTracks(DEFAULT_TIME_RANGE);
        getRecentTracks(25);
        getCurrentlyPlaying();
        getGenreSeeds();
        getAlbumRecommendations();

        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGenreSeeds = () => {
        axios.get('/recommendations/available-genre-seeds').then(response => {
            setAvailableGenres(response.data.genres);
        });
    }

    const getProfile = async (timeRange) => {
        axios.get('/me').then(response => {
            setProfile(response.data);
        });
    }

    const login = () => {
        window.location.replace(AUTH_ENDPOINT+'?client_id='+CLIENT_ID+'&redirect_uri='+REDIRECT_URI+'&response_type='+RESPONSE_TYPE+'&scope='+SCOPE);
    }

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
        navigate("/login");
    }

    const getArtists = async (timeRange) => {
        axios.get('/me/top/artists', {
            params: {
                time_range: timeRange
            }
        }).then(response => {
            setArtists(response.data.items);
        })
    }

    const getTracks = async (timeRange) => {
        axios.get('/me/top/tracks', {
            params: {
                time_range: timeRange
            }
        }).then(response => {
            setTracks(response.data.items);
        })
    }

    const getGenres = async (timeRange) => {
        axios.get('/me/top/artists', {
            params: {
                time_range: timeRange
            }
        }).then(res0 => {
            let newMap = new Map();

            for (let i = 0; i < res0.data.items.length; i++) {
                for (let ii = 0; ii < res0.data.items[i].genres.length; ii++) {
                    let genre = res0.data.items[i].genres[ii];

                    if (newMap.has(genre)) {
                        newMap.set(genre, newMap.get(genre) + 1);
                    } else {
                        newMap.set(genre, 1);
                    }
                }
            }

            let sortedMap = new Map([...newMap.entries()].sort((a, b) => b[1] - a[1]));

            setTopGenres(sortedMap);
        });
    }

    const getRecentTracks = async (limit) => {
        axios.get('/me/player/recently-played', {
            params: {
                limit: limit
            }
        }).then(response => {
            let tracks = [];

            for (let track of response.data.items) {
                tracks.push(track.track);
            }
            setRecentTracks(tracks);
        })
    }

    const getCurrentlyPlaying = async () => {
        axios.get('/me/player/currently-playing').then(response => {
            
            setCurrentTrack(response.data.item);
        })
    }

    const getSavedAlbums = async (limit) => {
        axios.get('/me/albums', {
            params: {
                limit: limit
            }
        }).then(response => {
            let albumList = [], albumListIds = [];

            for (let album of response.data.items) {
                albumList.push(album.album);
                albumListIds.push(album.album.id);
            }

            setSavedAlbums(albumList);
            setSavedAlbumsIds(albumListIds);
        })
    }

    const getTrackInfo = async (id) => {
        return await axios.get('/audio-features/' + id);
    }

    /*
    const getTracksInfo = async (tracks) => {
        let idString = "";

        for(let i = 0; i < tracks.length; i++) {
            let separator = i !== tracks.length-1 ? "," : "";
            idString += tracks[i].id + separator;
        }

        return await axios.get('/audio-features', {
            params: {
                ids: idString
            }
        })
    }*/

    const getTrackRecommendations = async (genresString, energy, valence, danceability, acousticness, tempo, popularity, duration, limit, sort) => {
        axios.get('/recommendations', {
            params: {
                seed_genres: genresString,
                min_energy: energy[0],
                max_energy: energy[1],
                min_valence: valence[0],
                max_valence: valence[1],
                min_danceability: danceability[0],
                max_danceability: danceability[1],
                min_acousticness: acousticness[0],
                max_acousticness: acousticness[1],
                min_tempo: tempo[0],
                max_tempo: tempo[1],
                min_popularity: popularity[0],
                max_popularity: popularity[1],
                min_duration: duration[0],
                max_duration: duration[1],
                limit: limit
            }
        }).then(res => {
            let tracks = res.data.tracks;
            let idString = "";

            for(let i = 0; i < tracks.length; i++) {
                let separator = i !== tracks.length-1 ? "," : "";
                idString += tracks[i].id + separator;
            }

            axios.get('/audio-features', {
                params: {
                    ids: idString
                }
            }).then(res => {
                for(let i = 0; i < tracks.length; i++) {
                    tracks[i] = {...tracks[i], ...res.data.audio_features[i]};
                }

                console.log(tracks);
                console.log(sort);
    
                if(sort.energy) {
                    tracks.sort((a,b) => b.energy - a.energy);
                } else if (sort.valence) {
                    tracks.sort((a,b) => b.valence - a.valence);
                } else if (sort.danceability) {
                    tracks.sort((a,b) => b.danceability - a.danceability);
                } else if (sort.acousticness) {
                    tracks.sort((a,b) => b.acousticness - a.acousticness);
                } else if (sort.tempo) {
                    tracks.sort((a,b) => b.tempo - a.tempo);
                } else if (sort.popularity) {
                    tracks.sort((a,b) => b.popularity - a.popularity);
                } else if (sort.duration) {
                    tracks.sort((a,b) => b.duration_ms - a.duration_ms);
                }

                setRecommendedTracks(tracks);
            })
        });
    }

    const getAlbumRecommendations = async () => {
        // GET GENRES
        axios.get('/me/top/artists', {
            params: {
                time_range: 'long_term'
            }
        }).then(res0 => {
            let newMap = new Map();

            for (let i = 0; i < res0.data.items.length; i++) {
                for (let ii = 0; ii < res0.data.items[i].genres.length; ii++) {
                    let genre = res0.data.items[i].genres[ii];

                    if (newMap.has(genre)) {
                        newMap.set(genre, newMap.get(genre) + 1);
                    } else {
                        newMap.set(genre, 1);
                    }
                }
            }

            let sortedMap = new Map([...newMap.entries()].sort((a, b) => b[1] - a[1]));

            setTopGenres(sortedMap);

            let genreString = '';
            let i = 0;

            for (const [key] of topGenres.entries()) {
                i++;
                i <= 1 ? genreString += key + "," : void (0);
            }

            genreString = genreString.slice(0, -1);

            // GET ARTISTS

            axios.get('/me/top/artists', {
                params: {
                    time_range: 'long_term',
                    limit: 1
                }
            }).then(res1 => {
                let artistString = '';

                for (let artist of res1.data.items) {
                    artistString += artist.id + ',';
                }

                artistString = artistString.slice(0, -1);

                // GET TRACKS

                axios.get('/me/top/tracks', {
                    params: {
                        time_range: 'long_term',
                        limit: 3
                    }
                }).then(res2 => {
                    // GET RECOMMENDATIONS

                    axios.get('/recommendations', {
                        // seeds must add up to 5 in total
                        params: {
                            seed_genres: '',
                            seed_artists: artistString,
                            seed_tracks: '',
                            limit: 100
                        }
                    }).then(res3 => {
                        let albumList = [], albumListIds = [];

                        for (let track of res3.data.tracks) {
                            if (track.album.album_type === "ALBUM" && !albumListIds.includes(track.album.id)) {
                                albumListIds.push(track.album.id);
                                albumList.push(track.album);
                            }
                        }
                        setRecommendedTracks(res3.data.tracks);
                        setRecommendedAlbums(albumList);
                    })
                })
            })
        })
    }

    return (
        <Box sx={{color: 'lightgray'}}>
            <NavBar
                token={token}
                CLIENT_ID={CLIENT_ID}
                REDIRECT_URI={REDIRECT_URI}
                AUTH_ENDPOINT={AUTH_ENDPOINT}
                RESPONSE_TYPE={RESPONSE_TYPE}
                SCOPE={SCOPE}
                login={login}
                logout={logout}
                timer={timer}
                profile={profile}
            />
            <Box sx={{backgroundColor: '#282c34', height: '100%'}}>
                <Routes>
                    {window.localStorage.getItem("token") ? 
                    <Route path="/" element={<Home 
                        savedAlbums={savedAlbums} 
                        savedAlbumsIds={savedAlbumsIds} 
                        recommendedAlbums={recommendedAlbums} 
                        recommendedTracks={recommendedTracks} 
                        getTrackRecommendations={getTrackRecommendations} 
                        availableGenres={availableGenres} 
                        getTrackInfo={getTrackInfo}
                        />} />
                    : <Route path="/" element={<LoginPage login={login}/>} />}

                    <Route path="/home" element={<Home 
                        savedAlbums={savedAlbums} 
                        savedAlbumsIds={savedAlbumsIds} 
                        recommendedAlbums={recommendedAlbums} 
                        recommendedTracks={recommendedTracks} 
                        getTrackRecommendations={getTrackRecommendations}
                        availableGenres={availableGenres} 
                        getTrackInfo={getTrackInfo}
                        />} />

                    <Route path="/profile" element={<Profile 
                        profile={profile} 
                        artists={artists} 
                        tracks={tracks} 
                        recentTracks={recentTracks}
                        topGenres={topGenres}
                        getArtists={getArtists} 
                        getTracks={getTracks} 
                        getGenres={getGenres}
                        currentTrack={currentTrack}
                        getTrackInfo={getTrackInfo}
                        />} />

                    <Route path="/login" element={<LoginPage login={login}/>} />
                </Routes>
            </Box>
            <Footer />
        </Box>
    );

}

export default App;