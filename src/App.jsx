import * as React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const [token, setToken] = useState("");

    const CLIENT_ID = "ce1dff647ef6413ebee5c2e68552730b";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SPOTIFY_API = "https://api.spotify.com/v1";
    const DEFAULT_TIME_RANGE = "medium_term";
    const RESPONSE_TYPE = "token";
    const SCOPE = "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing" +
        " user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read" +
        " streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private" +
        " playlist-read-collaborative playlist-read-private playlist-modify-public";

    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [recentTracks, setRecentTracks] = useState([]);
    const [genres, setGenres] = useState(new Map());
    const [savedAlbums, setSavedAlbums] = useState([]);
    const [savedAlbumsIds, setSavedAlbumsIds] = useState([]);
    const [profile, setProfile] = useState("");
    const [recommendedAlbums, setRecommendedAlbums] = useState([]);

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        axios.defaults.baseURL = SPOTIFY_API;
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers['Content-Type'] = 'application/json';

        setToken(token);

        getSavedAlbums(50);

        getProfile();
        getArtists(DEFAULT_TIME_RANGE);
        getTracks(DEFAULT_TIME_RANGE);

        // limits in seeds must all add up to 5 or less
        getAlbumRecommendations();
        getRecentTracks(10);

    }, []);

    const getProfile = async (timeRange) => {
        axios.get('/me').then(response => {
            setProfile(response.data);
        });

    }

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
        window.location.reload();
    }

    const getArtists = async (timeRange) => {
        axios.get('/me/top/artists', {
            params: {
                time_range: timeRange,
                limit: 5
            }
        }).then(response => {
            setArtists(response.data.items);
        })
    }

    const getTracks = async (timeRange) => {
        axios.get('/me/top/tracks', {
            params: {
                time_range: timeRange,
                limit: 5
            }
        }).then(response => {
            setTracks(response.data.items);
        })
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

    const getAlbumRecommendations = async () => {
        // GET GENRES
        axios.get('/me/top/artists', {
            params: {
                time_range: 'long_term'
            }
        }).then(res0 => {
            let newMap = new Map();

            for (let i = 0; i < res0.data.items.length; i++) {
                for (let ii = 0; ii < res0. data.items[i].genres.length; ii++) {
                    let genre = res0.data.items[i].genres[ii];

                    if (newMap.has(genre)) {
                        newMap.set(genre, newMap.get(genre) + 1);
                    } else {
                        newMap.set(genre, 1);
                    }
                }
            }

            let sortedMap = new Map([...newMap.entries()].sort((a, b) => b[1] - a[1]));

            for (const [key, value] of sortedMap.entries()) {
                setGenres(genres.set(key, value));
            }

            let genreString = '';
            let i = 0;

            for (const [key, value] of genres.entries()) {
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
                    let trackString = '';

                    for (let track of res2.data.items) {
                        trackString += track.id + ',';
                    }

                    trackString = trackString.slice(0, -1);

                    // GET RECOMMENDATIONS

                    axios.get('/recommendations', {
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

                        setRecommendedAlbums(albumList);
                    })
                })
            })
        })
    }

    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <NavBar
                        token={token}
                        CLIENT_ID={CLIENT_ID}
                        REDIRECT_URI={REDIRECT_URI}
                        AUTH_ENDPOINT={AUTH_ENDPOINT}
                        RESPONSE_TYPE={RESPONSE_TYPE}
                        SCOPE={SCOPE}
                        logout={logout}
                    />
                </div>
                <div className="App-body">
                    <Routes>
                        <Route path="/" element={<Home savedAlbums={savedAlbums} savedAlbumsIds={savedAlbumsIds} recommendedAlbums={recommendedAlbums} />} />
                        <Route path="/home" element={<Home savedAlbums={savedAlbums} savedAlbumsIds={savedAlbumsIds} recommendedAlbums={recommendedAlbums} />} />
                        <Route path="/profile" element={<Profile profile={profile} artists={artists} tracks={tracks} recentTracks={recentTracks} getArtists={getArtists} getTracks={getTracks} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );

}

export default App;