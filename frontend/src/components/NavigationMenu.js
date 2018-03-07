import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavigationMenu extends React.Component {
    render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <Link className='navbar-brand' to={ '/' }>Assignment 4</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/building' } activeClassName='active'>
                                Buildings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
