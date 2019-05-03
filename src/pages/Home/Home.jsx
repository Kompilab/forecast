import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Navbar from '../../components/Navbar';
import Icon from 'react-web-vector-icons';
import userAuth from '../../services/authenticate';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logoText: 'forecast',
      features: [
        {
          position: '01',
          name: 'Stay Organized',
          icon: 'organization',
          font: 'SimpleLineIcons',
          summary: 'Monitor cash flow and stay on top of your finances.'
        },
        {
          position: '02',
          name: 'Budgeting',
          icon: 'calculator',
          font: 'SimpleLineIcons',
          summary: 'Easily create budgets you can actually stick to, and see how you’re spending your money.'
        },
        {
          position: '03',
          name: 'Run Diagnostics',
          icon: 'dotchart',
          font: 'AntDesign',
          summary: 'Make better financial decisions by understanding your spending habit.'
        }
      ]
    }
  }

  render() {
    const { logoText, features } = this.state;

    return (
      <div>
        <Navbar title={logoText} {...this.props} />

        <header className="container-fluid home-header">
          <div className="row align-items-center">
            <div className="col-sm left-text">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <p>How much have I spent this month?</p>
                </div>
              </div>
            </div>

            <div className="col-sm right-text">
              <div className="row">
                <div className="col-md-6 offset-md-3 text-center align-self-center">
                  <p>"The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails."</p>
                  <p>- William Arthur Ward</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <Link to="/dashboard">
              <button className="btn btn-primary btn-fo-primary my-2 my-sm-0 btn-lg">
                { userAuth.isAuthenticated ? 'My Dashboard' : 'Get Started' }
              </button>
            </Link>
          </div>
        </header>

        <section className="container">
          <div className="row justify-content-center">
            <div className="float-bg col-12"></div>
          </div>
        </section>

        <section className="container features">
          <div className="section-title text-center">
            <h2>Features</h2>
          </div>

          <div className="row">
            {
              !!features.length && features.map((feature, $i) => {
                return (
                  <div className="col-sm-4 feature" key={$i}>
                    <Icon
                      font={feature.font}
                      name={feature.icon}
                      color='#007ACC'
                      size={60}
                      // style={{}}
                    />

                    <div className="row align-items-center">
                      <div className="col-2 position">
                        <span>{feature.position}</span>
                      </div>

                      <div className="col-10 name">
                        <h4>{feature.name}</h4>
                      </div>
                    </div>

                    <div className="summary">
                      <p>{feature.summary}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>

        <section className="tired-taglines text-center">
          <div className="section-tagline">
           <h3>Are you tired of running out of funds before the next paycheck?</h3>
          </div>

          <p>Take charge of your cash flow and make better financial decisions by understanding your spending habit</p>

          <div className="row justify-content-center">
            <Link to="/dashboard">
              <button className="btn btn-primary btn-fo-primary my-2 my-sm-0 btn-lg">Get Started Now</button>
            </Link>
          </div>
        </section>

        <footer className="text-center">
          <p className="foot-logo">{logoText}</p>
          <p className="copyright">&copy; 2019 Kompilab. All rights reserved.</p>
        </footer>
      </div>
    )
  }
}

export default Home;
