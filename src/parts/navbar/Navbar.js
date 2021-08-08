import React, { useState } from 'react'
import './Navbar.css'
import * as ImIcons from 'react-icons/im'
import { useHistory } from 'react-router'


export default function Navbar() {
    const [search, setSearch] = useState('')
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault();
        history.push({
            pathname: `/`,
            state: {
                id: search
            }
        })
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
                                    title="search"
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
