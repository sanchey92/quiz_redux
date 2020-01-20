import React, {Component} from "react";
import './layout.css'
import MenuToggle from "../../navigation/menu-toggle/menu-toggle";
import Drawer from "../../navigation/drawer/drawer";
import {connect} from "react-redux";

class Layout extends Component {

  state = {
    menu: false
  };

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
  };

  closeMenu = () => {
    this.setState({menu: false})
  };

  render() {
    return (
      <div className='layout'>
        <Drawer
          isAuth={this.props.isAuth}
          isOpen={this.state.menu}
          onClose={this.closeMenu}
        />
        <MenuToggle
          onToggle={this.toggleMenu}
          isOpen={this.state.menu}
        />
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  }
};


export default connect(mapStateToProps)(Layout)