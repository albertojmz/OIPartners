import React from 'react';
import img from '../../img/user.jpg';
import '../../css/main.css';
import '../../css/sidebar-themes.css';
import '../../css/dashboard.css';

export default class Sidebar extends React.Component{



    render(){

        return(

            <div className="page-wrapper default-theme toggled">
                <div className="sidebar">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">

                        <div className="sidebar-item sidebar-brand">
                            <a href="#">OI Partners</a>
                        </div>

                        <div className="sidebar-item sidebar-header d-flex flex-nowrap">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src={img} alt="User picture"/>
                            </div>
                            <div className="user-info">
                        <span className="user-name">
                            <strong></strong>
                        </span>
                                <span className="user-role">

                        </span>
                                <span className="user-status">
                            <i className="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                            </div>
                        </div>


                        <div className=" sidebar-item sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>General</span>
                                </li>
                                <li className="sidebar-dropdown" id="dashboard">
                                    <a href="">
                                        <i className="fas fa-home"></i>
                                        <span className="menu-text">Dashboard</span>
                                    </a>
                                </li>
                                <li className="sidebar-dropdown" id="projects">

                                    <a href="#">
                                        <i className="fa fa-list"></i>
                                        <span className="menu-text">Projects</span>
                                    </a>


                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="">
                                                    Projects List
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown" id="create">
                                    <a href="#">
                                        <i className="fas fa-check"></i>
                                        <div id="create" className="item">
                                            <span className="menu-item">Activities</span>
                                        </div>
                                        <span className="badge badge-pill badge-danger">3</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="">Activities List</a>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#">
                                        <i className="far fa-gem"></i>
                                        <span className="menu-text">Components</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">General</a>
                                            </li>
                                            <li>
                                                <a href="#">Panels</a>
                                            </li>
                                            <li>
                                                <a href="#">Tables</a>
                                            </li>
                                            <li>
                                                <a href="#">Icons</a>
                                            </li>
                                            <li>
                                                <a href="#">Forms</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#">
                                        <i className="fa fa-chart-line"></i>
                                        <span className="menu-text">Charts</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">Pie chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Line chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Bar chart</a>
                                            </li>
                                            <li>
                                                <a href="#">Histogram</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="#">
                                        <i className="fa fa-globe"></i>
                                        <span className="menu-text">Maps</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="#">Google maps</a>
                                            </li>
                                            <li>
                                                <a href="#">Open street map</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="header-menu">
                                    <span>Extra</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-book"></i>
                                        <span className="menu-text">Documentation</span>
                                        <span className="badge badge-pill badge-primary">Beta</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-calendar"></i>
                                        <span className="menu-text">Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-folder"></i>
                                        <span className="menu-text">Examples</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="sidebar-footer">
                        <div className="dropdown">

                            <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-bell"></i>
                                <span className="badge badge-pill badge-warning notification">3</span>
                            </a>
                            <div className="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
                                <div className="notifications-header">
                                    <i className="fa fa-bell"></i>
                                    Notifications
                                </div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    <div className="notification-content">
                                        <div className="icon">
                                            <i className="fas fa-check text-success border border-success"></i>
                                        </div>
                                        <div className="content">
                                            <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                            <div className="notification-time">
                                                6 minutes ago
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <div className="notification-content">
                                        <div className="icon">
                                            <i className="fas fa-exclamation text-info border border-info"></i>
                                        </div>
                                        <div className="content">
                                            <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                            <div className="notification-time">
                                                Today
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <div className="notification-content">
                                        <div className="icon">
                                            <i className="fas fa-exclamation-triangle text-warning border border-warning"></i>
                                        </div>
                                        <div className="content">
                                            <div className="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                            <div className="notification-time">
                                                Yesterday
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-center" href="#">View all notifications</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-envelope"></i>
                                <span className="badge badge-pill badge-success notification">7</span>
                            </a>
                            <div className="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
                                <div className="messages-header">
                                    <i className="fa fa-envelope"></i>
                                    Messages
                                </div>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    <div className="message-content">
                                        <div className="pic">
                                            <img src="img/user.jpg" alt=""/>
                                        </div>
                                        <div className="content">
                                            <div className="message-title">
                                                <strong> Jhon doe</strong>
                                            </div>
                                            <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                        </div>
                                    </div>

                                </a>
                                <a className="dropdown-item" href="#">
                                    <div className="message-content">
                                        <div className="pic">
                                            <img src="img/user.jpg" alt=""/>
                                        </div>
                                        <div className="content">
                                            <div className="message-title">
                                                <strong> Jhon doe</strong>
                                            </div>
                                            <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                        </div>
                                    </div>

                                </a>
                                <a className="dropdown-item" href="#">
                                    <div className="message-content">
                                        <div className="pic">
                                            <img src="img/user.jpg" alt=""/>
                                        </div>
                                        <div className="content">
                                            <div className="message-title">
                                                <strong> Jhon doe</strong>
                                            </div>
                                            <div className="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit. In totam explicabo</div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-center" href="#">View all messages</a>

                            </div>
                        </div>
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog"></i>
                                <span className="badge-sonar"></span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuMessage">
                                <a className="dropdown-item" href="#">My profile</a>
                                <a className="dropdown-item" href="#">Help</a>
                                <a className="dropdown-item" href="#">Setting</a>
                            </div>
                        </div>
                        <div>
                            <a href="LogoutServlet">
                                <i className="fa fa-power-off"></i>
                            </a>
                        </div>
                        <div className="pinned-footer">
                            <a href="#">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                        </div>
                    </div>
                </nav>
                </div>
            </div>

        )
            }


        }


