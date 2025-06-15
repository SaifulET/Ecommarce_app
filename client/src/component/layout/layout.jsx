/* eslint-disable react/prop-types */

import AppNavBar from "./AppNavBar";
import Footer from './footer';
import {Toaster} from "react-hot-toast"


const Layout = (props) => {
    return (
        <div>
            <AppNavBar/>
            {props.children}
            <Toaster position="top-right"/>
            <Footer/>
        </div>
    );
};

export default Layout;