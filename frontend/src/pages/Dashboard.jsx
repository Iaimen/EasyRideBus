// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'

function Dashboard() {

  useEffect(() => {
    // Dynamically load the script after component mounts
    const script = document.createElement('script');
    script.src = "/assets/static/demo/chart-area-demo.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Dynamically load the script after component mounts
    const script = document.createElement('script');
    script.src = "/assets/static/demo/chart-bar-demo.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
        <link href="/assets/css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

      </head>
      <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="/">EasyRide</a>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <p className='text-white p-5 m-5'>Hello, <b>ADMIN</b></p>
            </div>
          </form>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <hr />
                  <a className="nav-link" href="/dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                  </a>
                  <a className="nav-link" href="/category">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Categories
                  </a>
                  <a className="nav-link" href="/location">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Locations
                  </a>
                  <a className="nav-link" href="/bus">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Buses
                  </a>
                  <a className="nav-link" href="/schedule">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Schedule
                  </a>
                  <a className="nav-link" href="/booking">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Booking
                  </a>
                  <br /><br />
                  <a className="nav-link" href="/">
                    Logout
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Bus Ticketing System</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">EasyRide</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Explore Locations</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <p>Explore different cities</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Manage Buses</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <p>Buses for different Routes</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Manage Bookings</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <p>Update Customer status</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Schedule for Buses</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <p>Check for Details</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Sales After Promotions
                      </div>
                      <div className="card-body">
                        <canvas id="myAreaChart" width="675" height="270"></canvas>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Number of Tickets Sold Each Month
                      </div>
                      <div className="card-body">
                        <canvas id="myBarChart" width="675" height="270"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard