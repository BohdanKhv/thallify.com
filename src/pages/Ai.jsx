import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { topArtists, resetList, topTracks } from "../features/list/listSlice"
import { Nav, Header } from "../components"
import { spotifyLogo } from "../assets/img/img"
import { Link } from "react-router-dom"
import { getAiInsight } from "../features/ai/aiSlice"
import Download from "../components/navigation/Download"


const AiInsights = () => {
    const { data } = useSelector(state => state.ai)
    const { tracks } = useSelector(state => state.list)

    return (
        <div>
            {data && data.length > 0 &&
                <div className="p-2">
                    <p
                        dangerouslySetInnerHTML={{__html: data.replace(/<NEWLINE\/>/g, "<br /><br />").replace(/<TITLE>/g, "<p class='bold fs-20'>").replace(/<\/TITLE>/g, "</p>")}}
                    />
                </div>
            }
        </div>
    )
}

const Ai = () => {
    const dispatch = useDispatch()

    const { tracks, isLoading, isError } = useSelector(state => state.list)
    const { data: aiData, isLoading: aiDataIsLoading, isError: aiDataIsError } = useSelector(state => state.ai)

    useEffect(() => {
        window.scrollTo(0, 0)

        document.title = "Thallify.com | AI"
    }, [])

    useEffect(() => {
        const promise = dispatch(topTracks({
            timeRange: "long_term",
        }))

        return () => {
            promise && promise.abort()
            dispatch(resetList())
        }
    }, [])

    useEffect(() => {
        if (aiData) return
        if (tracks && tracks.length > 5) {
            const minifiedData = tracks.map(track => ({
                name: track.name,
                artists: track.artists.map(artist => artist.name),
                album: track.album.name,
                release_date: track.album.release_date,
                popularity: track.popularity
            }))
            let messages = [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: "Can you tell me more about me based on my music?"
                },
                {
                    role: "system",
                    content: "Sure, what would you like to know?"
                },
                {
                    role: "user",
                    content: "I would like a paragraph about my music taste, a paragraph about my potential mood, a paragraph about my potential hobbies or traits, and a paragraph about my potential personality. But keep it short and simple. Separate each paragraph with a new <NEWLINE/> tag. And title like: <TITLE>...</TITLE> tag."
                },
                {
                    role: "system",
                    content: "I can do that. What is the music data?"
                },
                {
                    role: "user",
                    content: "Do not follow up on this. Do not ask questions. Just generate the insights."
                },
                {
                    role: "user",
                    content: JSON.stringify(minifiedData)
                },
            ]

            dispatch(getAiInsight({
                messages: messages
            }))
        }
    }, [tracks, aiData])

    return (
        <div className="container">
            <Header />
            {tracks && tracks.length > 5 &&
                <div className="flex justify-between px-2 pb-2">
                    <div className="fs-20">
                    </div>
                    <Download/>
                </div>
            }
            <div className="border-radius border border-sm-none overflow-hidden">
                <div className="overflow-hidden parent-node">
                    <div className={`flex-col flex bg-main min-h-sm image-node`}>
                        <div className="text-center p-2 border-bottom show-on-saving">
                            <p className="fs-18 bold">
                                AI generated about me based on my Top {tracks?.length} Spotify tracks
                            </p>
                        </div>
                        {isLoading ?
                            <p
                                className="text-center"    
                            style={{padding: "5rem 1rem"}}
                            >
                                Getting your spotify data...
                            </p>
                        : !tracks || tracks.length <= 5 ?
                            <p
                                className="text-center"    
                            style={{padding: "5rem 1rem"}}
                            >
                                You need to have at least 5 tracks in your spotify library to get AI insights.
                            </p>
                        : aiDataIsLoading ?
                            <p
                                className="text-center"    
                            style={{padding: "5rem 1rem"}}
                            >
                                Getting AI insights...
                            </p>
                        : aiDataIsError || isError ?
                            <p
                                className="text-center"    
                            style={{padding: "5rem 1rem"}}
                            >
                                {aiData || "Something went wrong, please try again later."}
                            </p>
                        : 
                        <>
                        <AiInsights />
                        <div className={`spotify-logo grid-col-1-1 border-bottom flex justify-between align-center p-1`}>
                            <div className="spotify-logo flex-grow px-3">
                                {spotifyLogo}
                            </div>
                            <p className="bold fs-4 text-center">
                                thallify.com
                            </p>
                        </div>
                        </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ai