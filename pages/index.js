import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState } from 'react';

const Index = () => {
    const [error, setError] = useState('');
    const sendTestEmail = async () => {
        try {
            const res = await axios.post('/sendHTMLEmail');
            setError('res', JSON.stringify(res));
            console.log('res.data', res.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            Hello!
            <p>Press button to send a test email</p>
            <Button onClick={sendTestEmail}>Test!</Button>
            <p>{error}</p>
        </div>
    );
};

export default Index;
