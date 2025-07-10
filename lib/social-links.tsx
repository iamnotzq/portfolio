import React from 'react';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconMail,
    IconFileText,
} from "@tabler/icons-react";

/**
 * List of social media and contact links.
 */
export const socialLinks = [
    {
        href: "https://github.com/iamnotzq",
        title: "GitHub",
        icon: <IconBrandGithub className='w-9 h-9 hover:scale-110 transition-transform duration-200' />
    },
    {
        href: "mailto:lamzhiqiang98@gmail.com",
        title: "Email",
        icon: <IconMail className='w-9 h-9 hover:scale-110 transition-transform duration-200' />
    },
    {
        href: "https://linkedin.com/in/lam-zhi-qiang",
        title: "LinkedIn",
        icon: <IconBrandLinkedin className='w-9 h-9 hover:scale-110 transition-transform duration-200' />
    },
    {
        href: "/Lam_Zhi_Qiang_Resume.pdf",
        title: "Download Resume",
        icon: <IconFileText className='w-9 h-9 hover:scale-110 transition-transform duration-200' />
    },
];
