import React from 'react'

function Home() {
    return (
        <div>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">Your safe Travel Journey is Our Main
                                Goal
                            </h1>
                            <p className="fs-4 text-white mb-4 animated slideInDown">Tempor erat elitr rebum at clita diam amet
                                diam et eos erat ipsum lorem sit</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End  */}

            {/* Popular Routes  */}
            {/* Packages Start  */}
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <div className="text-center mb-3 pb-3">
                        <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>Packages</h6>
                        <h1>Popular Routes</h1>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="package-item bg-white mb-2">
                                <img className="img-fluid" src="/assets/img/11.jpg" alt="" />
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2"></i>
                                            Lahore-Rawalpindi</small>
                                    </div>
                                    <a className="h5 text-decoration-none" href="/">Lahore to Rawalpindi: Your Journey,
                                        Our Route</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>4.5 <small>(250)</small>
                                            </h6>
                                            <h5 className="m-0">$350</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="package-item bg-white mb-2">
                                <img className="img-fluid" src="/assets/img/14.jpg" alt="" />
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2"></i>
                                            Islamabad-Lahore</small>
                                    </div>
                                    <a className="h5 text-decoration-none" href="/">Islamabad to Lahore: Bridging Hearts, Miles
                                        Apart</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>3.5 <small>(250)</small>
                                            </h6>
                                            <h5 className="m-0">$350</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="package-item bg-white mb-2">
                                <img className="img-fluid" src="/assets/img/13.jpg" alt="" />
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2"></i>
                                            Quetta-Islamabad</small>
                                    </div>
                                    <a className="h5 text-decoration-none" href="/">Quetta to Islamabad: Across Landscapes, Beyond
                                        Horizons</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>3 <small>(250)</small>
                                            </h6>
                                            <h5 className="m-0">$350</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Packages End  */}

            {/* Why Choose Us  */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                        <h1 className="mb-5">Why Choose Us</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                    <h5>Convenient Booking</h5>
                                    <p>Easily book tickets online or through our app, with instant confirmation</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                                    <h5>Comfortable Travel</h5>
                                    <p>Relax in our comfortable buses equipped with clean facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user text-primary mb-4"></i>
                                    <h5>Affordable Rates</h5>
                                    <p>Enjoy competitive pricing and special discount without compromising on quality.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                                    <h5>Safety First</h5>
                                    <p>Our buses are regularly inspected and our drivers are highly trained and experienced.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Start  */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Process</h6>
                        <h1 className="mb-5">3 Easy Steps</h1>
                    </div>
                    <div className="row gy-5 gx-4 justify-content-center">
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: "100px", height: "100px" }}>
                                    <i className="fa fa-globe fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Choose Your Bus Service</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Pick a bus service provider or booking platform online or at a station</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: "100px", height: "100px" }}>
                                    <i className="fa fa-dollar-sign fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Select Your Trip Details</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Enter your departure and destination, date, and passenger details</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: "100px", height: "100px" }}>
                                    <i className="fa fa-plane fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Make Payment and Confirm</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Complete the payment and receive your ticket, either digitally or physically.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home