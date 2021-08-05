import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import './Home.css'
import * as moment from 'moment'
import flickrAPIs from '../../services/flickrAPIs'
import { useLocation } from 'react-router'


export default function Home(props) {
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [pageNumber, setPageNumber] = useState(8)
    const [totalData, setTotalData] = useState(0)
    let location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        setPageNumber(8)
        if (!isEmpty(location.state)) {
            getlistFlickrByTag(location.state.id)
        } else {
            getlistFlickr()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state])

    const getlistFlickr = () => {
        flickrAPIs.getlistFlickr()
            .then((res) => {
                paginationData(res.data.data, pageNumber)
                setAllData(res.data.data)
                setTotalData(res.data.data.length);
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const getlistFlickrByTag = (tag) => {
        flickrAPIs.getlistFlickrByTag(tag)
            .then((res) => {
                paginationData(res.data.data, pageNumber)
                setAllData(res.data.data)
                setTotalData(res.data.data.length);
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleTotalData = () => {
        setPageNumber(pageNumber + 4)
        paginationData(allData, pageNumber + 4)
    }

    const paginationData = (data, pageNumber) => {
        let newData = data.slice(0).slice(0, pageNumber)
        setData(newData)
    }


    return (
        <div className="wrap-home">
            <div className="wrap-inside-home">
                {!isEmpty(data) && data.map((item, i) => (
                    <div key={i} className="wrap-card-home">
                        <div className="wrap-inside-card-home">
                            <div className="wrap-image-card">
                                <img src={item.media.m} alt="img" />
                            </div>
                            <div className="wrap-content-card">
                                <label className="title-card" style={{ visibility: isEmpty(item.title) ? 'hidden' : 'visible' }}>{item.title}</label>
                                <label className="author-id">
                                    <a href={`https://www.flickr.com/people/${item.author_id}`} rel="noreferrer" target="_blank">Author ID : {item.author_id}</a>
                                </label>
                                <p className="date-taken">{moment(item.date_taken).format('LL')}</p>
                                <button className="btn-tag" style={{ visibility: isEmpty(item.tags) ? 'hidden' : 'visible' }}><label>{item.tags}</label></button>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ display: totalData <= pageNumber ? 'none' : 'block' }} className="load-more-btn">
                    <button onClick={handleTotalData}>Load More</button>
                </div>
            </div>
        </div>
    )
}
