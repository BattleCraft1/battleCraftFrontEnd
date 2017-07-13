import React from 'react';
import Option from './NavElement';
import styles from './Navbar.css'

class Navigator extends React.Component{
    render(){
        return (
          <div style = {styles.ul} className="col-lg-10 col-md-10 col-sm-12">
              <Option link="/collectionsPanel/tournaments">Tournaments</Option>
              <Option link="/collectionsPanel/games">Games</Option>
              <Option link="/collectionsPanel/rankings">Rankings</Option>
              <Option link="/collectionsPanel/tournaments">My Account</Option>
              <Option link="/collectionsPanel/users">Users</Option>
            </div>
        );
    }
};

export default Navigator;
