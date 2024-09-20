import React from 'react'

function Navbar() {
    return (
        <div>
            <div className="container-fluid position-relative p-0">
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i>EasyRide</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href="/" className="nav-item nav-link">Home</a>
                            <a href="/about" className="nav-item nav-link">About</a>
                            <a href="/book" className="nav-item nav-link">Book Ticket</a>
                            <div className="nav-item dropdown">
                            </div>
                        </div>
                        <a href="/login" className="btn btn-primary rounded-pill py-2 px-4">Login</a>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar