import instance from './axiosGlobal'

const getlistFlickr = () => {
    return instance.get(`/flickr`)
}

const flickrAPIs = {
    getlistFlickr
}

export default flickrAPIs