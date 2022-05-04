import { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            navigate('/login');
        } catch (error) {
            setError('Failed to log out');
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: </strong>
                    {currentUser.email}
                    <Link
                        to='/update-profile'
                        className='btn btn-primary w-100 mt-3'
                    >
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    );
};

export default Dashboard;
