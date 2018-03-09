import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/styles/page-not-found.scss';

const PageNotFoundComponent = () => {
    return <div className="page_not_found_wrapper">
        <h2>Page Not Found</h2>
        <Link to="/">Home</Link >
    </div>
};

export default PageNotFoundComponent;