import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-5 mt-auto" style={{ borderTop: "1px solid rgba(100, 255, 218, 0.1)", background: "var(--bg-primary)" }}>
            <Container className="text-center">
                <p className="mb-0 text-secondary small">
                    &copy; {new Date().getFullYear()} <span style={{ color: "var(--accent-primary)" }}>Finance Tracker</span>.
                    Built for accuracy and speed.
                </p>
            </Container>
        </footer>
    );
};


export default Footer;
