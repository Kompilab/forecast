import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './Dashboard.scss';
import Navbar from '../../components/Navbar';
import Icon from 'react-web-vector-icons';

// import dashboard views
import DHome from './Views/DHome';
import Transactions from './Views/Transactions';
import Categories from './Views/Categories';

const dashboardRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    main: () => <DHome />,
    font: 'MaterialIcons',
    fontName: 'dashboard',
    show: true
  },
  {
    name: 'Transactions',
    path: '/dashboard/transactions',
    main: () => <Transactions />,
    font: 'MaterialIcons',
    fontName: 'format-list-bulleted',
    show: true
  },
  {
    name: 'Categories',
    path: '/dashboard/categories',
    main: () => <Categories />,
    show: false
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobile: false
    }

    this.setViewport = this.setViewport.bind(this);
  }

  componentDidMount() {
    this.setViewport();
    window.addEventListener('resize', this.setViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewport)
  }

  setViewport() {
    if (window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < 768
      })
    }
  }

  render() {
    const { isMobile } = this.state;

    return (
      <div>
        <Navbar isMobile={isMobile} hideMenu={true} {...this.props} />

        <Router>
          <div className="dashboard container-fluid">
            <div className="row">
              <div className={`side-nav ${isMobile ? 'col-1' : 'col-2'}`}>
                <ul className="nav-items">
                   { dashboardRoutes.map((route, index) => (
                    route.show && <li className="nav-item mb-2" key={index}>
                      <NavLink exact={route.exact} to={route.path} activeClassName="active">
                        <Icon
                          font={route.font}
                          name={route.fontName}
                          color="inherit"
                          size={isMobile ? 20 : 16}
                          // style={{}}
                        />
                        { isMobile || <span className="ml-1">{route.name}</span> }
                      </NavLink>
                    </li>
                    )) }
                </ul>
              </div>

              <div className={`content ${isMobile ? 'col-11' : 'col-10'}`}>
                {dashboardRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default Dashboard;
