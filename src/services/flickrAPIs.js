import instance from './axiosGlobal'

const getlistFlickr = () => {
    return instance.get(`/flickr`)
}

const getlistFlickrByTag = (tag) => {
    return instance.get(`/flickr/${tag}`)
}


const flickrAPIs = {
    getlistFlickr,
    getlistFlickrByTag
}

export default flickrAPIs