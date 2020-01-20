import React, {Component, Fragment} from "react";
import './drawer.css'
import Backdrop from "../../UI/backdrop/backdrop";
import {NavLink} from 'react-router-dom'

export default class Drawer extends Component{

  clickHandler = () => {
    this.props.onClose()
  };

  renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName='active'
            onClick={this.clickHandler}
          >{link.label}
          </NavLink>
        </li>
      )
    })
  };

  render() {

    const cssClasses = ['drawer'];

    if (!this.props.isOpen) {
      cssClasses.push('close')
    }

    const links = [
      {to: '/', label: 'Список', exact: true},
    ];

    if (this.props.isAuth) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false});
    }

    return (
      <Fragment>
        <nav className={cssClasses.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </Fragment>
    )
  }
}
