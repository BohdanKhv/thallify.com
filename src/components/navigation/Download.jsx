import { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { saveAs } from 'file-saver'
import html2canvas from "html2canvas"
import { downloadIcon, gridIcon, listIcon, loadingIcon } from "../../assets/icons/icons"
import "./styles/Nav.css"


const Download = () => {
    const location = useLocation()
    const [isSaving, setIsSaving] = useState(false)

    const downloadImage = () => {
        setIsSaving(true)
        document.querySelector('.image-node').classList.add('saving')
        document.querySelector('.parent-node').classList.add('opacity-0')
        document.querySelector('.image-node').style.minWidth = '550px'
        document.querySelector('.image-node').style.maxWidth = '550px'

        setTimeout(() => {
            html2canvas(document.querySelector('.image-node'), {
                allowTaint: true,
                useCORS: true,
                scale: 2,
                width: document.querySelector('.image-node').offsetWidth,
                height: document.querySelector('.image-node').offsetHeight,
                dpi: 300,
            }).then(canvas => {
                const png = canvas.toDataURL("image/png")
                saveAs(png, 'image.png')
                setIsSaving(false)
                document.querySelector('.image-node').classList.remove('saving')
                document.querySelector('.image-node').style.minWidth = '0px'
                document.querySelector('.image-node').style.maxWidth = 'unset'
                document.querySelector('.parent-node').classList.remove('opacity-0')
            }).catch(err => {
                console.log(err)
                setIsSaving(false)
                document.querySelector('.image-node').classList.remove('saving')
                document.querySelector('.image-node').style.minWidth = '0px'
                document.querySelector('.image-node').style.maxWidth = 'unset'
                document.querySelector('.parent-node').classList.remove('opacity-0')
            })
        }, 1000)
    }

    return (
        <>
            {isSaving ? (
                <div
                    title="Downloading image"
                    className={`nav-item spinner`}>
                    {loadingIcon}
                </div>
            ) : 
                <div
                    title="Download"
                    onClick={downloadImage}
                    className={`nav-item`}>
                    {downloadIcon}
                </div>
            }
        </>
    )
}

export default Download