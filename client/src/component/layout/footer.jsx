import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <div className="section-bottom shadow-sm bg-white">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 className="bodyMedium">Legals</h1>
                            <p className="my-2">
                                <Link className="nav-link" to="/about">About</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/refund">Refund Policy</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/term">Terms</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h1 className="bodyMedium">Information</h1>
                            <p className="my-2">
                                <Link className="nav-link" to="/how-to-buy">How to buy</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/complain">Complain</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h1 className="bodyMedium">About</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                            <img className="w-75" src="https://unblast.com/wp-content/uploads/2018/11/Payment-Icons-1.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-3 text-center">
                <p className="text-white bodySmal">All Rights Reserved </p>
            </div>
        </div>
    );
};

export default Footer;