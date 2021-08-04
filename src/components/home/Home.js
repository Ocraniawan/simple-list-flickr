import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import './Home.css'
import * as moment from 'moment'
import flickrAPIs from '../../services/flickrAPIs'
import { useLocation } from 'react-router'

const dummyData = [
    {
        "title": "IMG_20180503_214334",
        "link": "https://www.flickr.com/photos/158189849@N02/42043339092/",
        "media": {
            "m": "https://live.staticflickr.com/962/42043339092_60381ef72e_m.jpg"
        },
        "date_taken": "2018-05-03T21:43:35-08:00",
        "description": " <p><a href=\"https://www.flickr.com/people/158189849@N02/\">anar.sadiqov.1991</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/158189849@N02/42043339092/\" title=\"IMG_20180503_214334\"><img src=\"https://live.staticflickr.com/962/42043339092_60381ef72e_m.jpg\" width=\"240\" height=\"180\" alt=\"IMG_20180503_214334\" /></a></p> ",
        "published": "2018-05-13T20:10:04Z",
        "author": "nobody@flickr.com (\"anar.sadiqov.1991\")",
        "author_id": "158189849@N02",
        "tags": "catanimals"
    },
    {
        "title": "A little prankster",
        "link": "https://www.flickr.com/photos/141044673@N08/37689224111/",
        "media": {
            "m": "https://live.staticflickr.com/4447/37689224111_bbb5876cc2_m.jpg"
        },
        "date_taken": "2017-10-14T04:09:56-08:00",
        "description": " <p><a href=\"https://www.flickr.com/people/141044673@N08/\">llarisaqwe</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/141044673@N08/37689224111/\" title=\"A little prankster\"><img src=\"https://live.staticflickr.com/4447/37689224111_bbb5876cc2_m.jpg\" width=\"240\" height=\"162\" alt=\"A little prankster\" /></a></p> ",
        "published": "2017-10-14T11:48:10Z",
        "author": "nobody@flickr.com (\"llarisaqwe\")",
        "author_id": "141044673@N08",
        "tags": "catanimals"
    },
    {
        "title": "A little prankster",
        "link": "https://www.flickr.com/photos/141044673@N08/23835899658/",
        "media": {
            "m": "https://live.staticflickr.com/4474/23835899658_5e72cb565e_m.jpg"
        },
        "date_taken": "2017-10-14T04:09:51-08:00",
        "description": " <p><a href=\"https://www.flickr.com/people/141044673@N08/\">llarisaqwe</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/141044673@N08/23835899658/\" title=\"A little prankster\"><img src=\"https://live.staticflickr.com/4474/23835899658_5e72cb565e_m.jpg\" width=\"240\" height=\"155\" alt=\"A little prankster\" /></a></p> ",
        "published": "2017-10-14T11:48:11Z",
        "author": "nobody@flickr.com (\"llarisaqwe\")",
        "author_id": "141044673@N08",
        "tags": "catanimals"
    },
    {
        "title": "What's over there",
        "link": "https://www.flickr.com/photos/jamezphillips/27181182445/",
        "media": {
            "m": "https://live.staticflickr.com/7297/27181182445_b57d9e869f_m.jpg"
        },
        "date_taken": "2013-03-19T02:09:20-08:00",
        "description": " <p><a href=\"https://www.flickr.com/people/jamezphillips/\">spinjam2</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/jamezphillips/27181182445/\" title=\"What&#039;s over there\"><img src=\"https://live.staticflickr.com/7297/27181182445_b57d9e869f_m.jpg\" width=\"240\" height=\"160\" alt=\"What&#039;s over there\" /></a></p> <p>A lone male on the hunt in Madikwe Game Reserve, South Africa. The river giving the perfect backdrop.</p>",
        "published": "2016-05-22T23:47:55Z",
        "author": "nobody@flickr.com (\"spinjam2\")",
        "author_id": "77086399@N07",
        "tags": "art catanimals southafricacatsouthafricamadikwe artcatsshadowsafricawildlifemaleoutdoorslionwildpredatorfineartsafariwhiskersleosouthafricarestingmanefelinecarnivorebigcatstawnymalelionpantherapantheraleobig5gamereservewildlifereserveselatibiggamestealthyafrica"
    },
    {
        "title": "Fred",
        "link": "https://www.flickr.com/photos/99161131@N02/26259339234/",
        "media": {
            "m": "https://live.staticflickr.com/7713/26259339234_f68cf8d538_m.jpg"
        },
        "date_taken": "2016-05-07T01:46:39-08:00",
        "description": " <p><a href=\"https://www.flickr.com/people/99161131@N02/\">juliane.samara</a> posted a photo:</p> <p><a href=\"https://www.flickr.com/photos/99161131@N02/26259339234/\" title=\"Fred\"><img src=\"https://live.staticflickr.com/7713/26259339234_f68cf8d538_m.jpg\" width=\"240\" height=\"160\" alt=\"Fred\" /></a></p> ",
        "published": "2016-05-07T08:41:41Z",
        "author": "nobody@flickr.com (\"juliane.samara\")",
        "author_id": "99161131@N02",
        "tags": "catanimals whitefluffy fredbagscatskittensblack"
    },
]

export default function Home(props) {
    const [data, setData] = useState(null)
    let location = useLocation()

    useEffect(() => {
        if (!isEmpty(location.state)) {
            getlistFlickrByTag(location.state.id)
        } else {
            setData(dummyData)
            getlistFlickr()
        }
    }, [location.state])

    const getlistFlickr = () => {
        flickrAPIs.getlistFlickr()
            .then((res) => {
                setData(res.data.items)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const getlistFlickrByTag = (tag) => {
        flickrAPIs.getlistFlickrByTag(tag)
            .then((res) => {
                setData(res.data.items)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
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
            </div>
        </div>
    )
}
