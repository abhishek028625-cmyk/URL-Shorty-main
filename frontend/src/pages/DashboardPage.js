import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Notification dikhane ke liye helper function
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000); // 3 second baad notification gayab ho jayega
    };

    // User ke saare URLs fetch karne ka function
    const fetchUrls = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/urls', {
                headers: { 'x-auth-token': token }
            });
            setUrls(res.data);
        } catch (err) {
            console.error('Could not fetch URLs');
        }
    };

    // Component ke pehli baar load hone par URLs fetch karo
    useEffect(() => {
        fetchUrls();
    }, []);

    // Form submit hone par yeh function chalega
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // 'const res =' hata diya gaya hai kyunki hum use nahi kar rahe the
            await axios.post('http://localhost:5000/api/urls/shorten', 
                { originalUrl },
                { headers: { 'x-auth-token': token } }
            );
            setOriginalUrl(''); // Input field ko khaali karo
            fetchUrls(); // URL list ko refresh karo
            showNotification('URL shortened successfully!', 'success');
        } catch (err) {
            showNotification(err.response?.data?.msg || 'Something went wrong', 'error');
        }
    };

    // Short URL ko clipboard par copy karne ka function
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showNotification('Short URL copied to clipboard!', 'success');
    }

    return (
        <div className="dashboard-container">
            <h2>URL Shortener</h2>
            
            {/* YAHAN BADLAV KIYA GAYA HAI: div ki jagah form aur onSubmit add kiya gaya hai */}
            <form onSubmit={onSubmit} className="url-form">
                <input 
                    type="url" 
                    value={originalUrl} 
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter a long URL to make it short"
                    required 
                />
                <button type="submit">Shorten</button>
            </form>

            {/* Notification message yahan dikhega */}
            {notification.message && 
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            }

            <div className="urls-list">
                <h3>Your Links</h3>
                {urls.map(url => (
                    <div className="url-card" key={url._id}>
                        <div className="original-url">
                            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                {url.originalUrl.length > 80 ? `${url.originalUrl.substring(0, 80)}...` : url.originalUrl}
                            </a>
                        </div>
                        <div className="short-url-section">
                            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="short-link">
                                {url.shortUrl.replace(/^https?:\/\//, '')}
                            </a>
                             <button onClick={() => copyToClipboard(url.shortUrl)} style={{marginLeft: '10px', cursor:'pointer'}}>Copy</button>
                            <span className="clicks">{url.clicks} Clicks</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;