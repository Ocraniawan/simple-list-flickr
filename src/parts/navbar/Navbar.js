import React, { useEffect, useState } from 'react'
import './Navbar.css'
import * as ImIcons from 'react-icons/im'


export default function Navbar() {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        alert(search)
        setSearch('')
    }

    const handleChange = (e) => {
        let target = e.target.value;
        setSearch(target);
    }


    return (
        <div>
            <div className="wrap-navbar fixed-top">
                <div className="navbar-content">
                    <div className="content-search">
                        <form autoComplete="off" onSubmit={handleSearch}>
                            <div className="navbar-search">
                                <input
                                    style={{ color: 'black' }}
                                    onChange={handleChange}
                                    placeholder="Search Tags Here !"
                                    name="search"
                                    value={search}
                                />
                                <button type="submit"><ImIcons.ImSearch /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
