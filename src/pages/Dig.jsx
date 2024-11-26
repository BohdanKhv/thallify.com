import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { topArtists, resetList } from "../features/list/listSlice"
import { Nav, Header, DigItems } from "../components"
import { spotifyLogo } from "../assets/img/img"
import { Link } from "react-router-dom"


const Dig = () => {
    const dispatch = useDispatch()
    const [itemLimit, setItemLimit] = useState(30)
    const [timeRange, setTimeRange] = useState("short_term")
    const [layout, setLayout] = useState("list_layout")

    useEffect(() => {
        window.scrollTo(0, 0)

        document.title = "Thallify.com | Dig Deeper"
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
            <div className="border-radius border border-sm-none overflow-hidden">
                <Nav
                    active={timeRange}
                    setTimeRange={setTimeRange}
                    setLayout={setLayout}
                    layout={layout}
                    setItemLimit={setItemLimit}
                    itemLimit={itemLimit}
                />
                <div className="overflow-hidden parent-node">
                    <div className={`${layout === 'list_layout' ? 'flex-col ' : 'flex-row flex-wrap p-1 justify-center gap-1 align-center '}flex bg-main min-h-sm image-node`}>
                        <div className="text-center p-2 border-bottom show-on-saving">
                            <p className="fs-20 bold">
                                My top spotify artists {timeRange === "short_term" ? "in the last 7 days" : timeRange === "medium_term" ? "in the last 6 month" : "of all time"}
                            </p>
                        </div>
                        <DigItems itemLimit={itemLimit} />
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

export default Dig