'use client'

import React from "react";
import {FaEye} from 'react-icons/fa'
import {BiTimeFive} from 'react-icons/bi'

const BlogList = () => {
    return <ul className="flex items-center gap-4">
        <li id="count-view" className="flex items-center gap-1 text-xs lg:text-base"><FaEye/><span>25 Views</span></li>
        <li className="flex items-center gap-1 text-xs lg:text-base"><BiTimeFive/><span>2 Minutes Read</span></li>
    </ul>
};

export default BlogList;
