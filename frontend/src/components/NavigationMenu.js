import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavigationMenu extends React.Component {
    render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <Link className='navbar-brand' to={ '/' }>Assignment 3</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span>Velkommen
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/sporsmalogsvar' } activeClassName='active'>
                                <span className='glyphicon glyphicon-info-sign'></span>Sp&#248;rsm&#229;l og svar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/kontaktoss'} activeClassName='active'>
                                <span className='glyphicon glyphicon-pencil'></span>Kontakt oss
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/sporsmaladmin'} activeClassName='active'>
                                <span className='glyphicon glyphicon-inbox'></span>Brukersp&#248;rsm&#229;l
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
