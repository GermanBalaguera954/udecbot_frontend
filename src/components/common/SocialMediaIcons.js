// src/components/common/SocialMediaIcons.js
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Importar el ícono de YouTube y Twitter
import { BsTwitterX } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

const IconLink = styled.a`
    color: #333;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
        color: #007bff;
    }
`;

const SocialMediaIcons = () => {
    return (
        <Container>
            <IconLink href="https://www.facebook.com/ucundinamarcaoficial/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
            </IconLink>
            <IconLink href="https://x.com/UCundinamarca" target="_blank" rel="noopener noreferrer">
                <BsTwitterX />
            </IconLink>
            <IconLink href="https://www.instagram.com/ucundinamarcaoficial/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </IconLink>
            <IconLink href="https://www.linkedin.com/school/ucundinamarcaoficial/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </IconLink>
            <IconLink href="https://www.youtube.com/user/Udecando" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
            </IconLink>
            <IconLink href="https://www.tiktok.com/@ucundinamarca_oficial" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
            </IconLink>
        </Container>
    );
};

export default SocialMediaIcons;
