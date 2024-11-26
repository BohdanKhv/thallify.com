import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { topArtists, resetList } from "../features/list/listSlice"
import { ArtistItem, Nav, Header, LoadingItem } from "../components"
import { spotifyLogo } from "../assets/img/img"
import { Link } from "react-router-dom"


const Artists = () => {
    const dispatch = useDispatch()
    const { artists, isLoading, isError } = useSelector(state => state.list)
    const [itemLimit, setItemLimit] = useState(10)
    const [timeRange, setTimeRange] = useState("short_term")
    const [layout, setLayout] = useState("list_layout")

    useEffect(() => {
        window.scrollTo(0, 0)

        document.title = "Thallify.com | Top Artists"
    }, [])

    useEffect(() => {
        const promise = dispatch(topArtists({
            timeRange: timeRange,
        }))

        return () => {
            promise && promise.abort()
            dispatch(resetList())
        }
    }, [timeRange, dispatch])

    return (
        <div className="container">
            <Header />
            <div className="border-radius border border-sm-none">
                <Nav
                    active={timeRange}
                    setTimeRange={setTimeRange}
                    setLayout={setLayout}
                    layout={layout}
                    setItemLimit={setItemLimit}
                    itemLimit={itemLimit}
                />
                <div className="overflow-hidden parent-node border-radius">
                    <div className={`${layout === 'list_layout' ? 'flex-col ' : 'flex-row flex-wrap p-1 justify-center gap-1 align-center '}flex bg-main min-h-sm image-node`}>
                        <div className="text-center p-2 border-bottom show-on-saving">
                            <p className="fs-20 bold">
                                My top spotify artists {timeRange === "short_term" ? "in the last 7 days" : timeRange === "medium_term" ? "in the last 6 month" : "of all time"}
                            </p>
                        </div>
                        {isLoading ? (
                            Array.from({ length: itemLimit }, (_, index) => (
                                <LoadingItem key={index} layout={layout} index={index+1} />
                            ))
                        ) : (
                            artists && artists.length > 0 && artists.slice(0, itemLimit <= 0 ? 1 : itemLimit).map((item, index, arr) => (
                                <ArtistItem 
                                    key={`item-${index}`}
                                    item={item}
                                    index={index}
                                    layout={layout}
                                    maxItemLimit={artists.length}
                                />
                        )))}
                        {!isLoading && artists && artists.length === 0 && (
                            <div className="text-center p-1">
                                Your list is empty. Try listening to more music and then come back to this page.
                            </div>
                        )}
                        <div className={`spotify-logo grid-col-1-1 border-bottom flex justify-between align-center ${layout === 'list_layout' ? 'p-1' : 'w-100 pb-2'}`}>
                            <div className="spotify-logo flex-grow px-3">
                                {spotifyLogo}
                            </div>
                            <p className="bold fs-4 text-center">
                                thallify.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 flex justify-center">
                <Link to="/about" className="text-center p-3" title="About">
                About Thallify
                </Link>
            </div>
        </div>
    )
}

export default Artists