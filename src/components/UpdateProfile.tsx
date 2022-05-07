import { useState } from 'react';
import { FormEvent } from 'react';
import { useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser, updateEmail, updatePassword } = useAuth();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            return setError('Passwords do not match');
        }

        const promises: any[] = [];

        setLoading(true);
        setError('');

        if (emailRef.current?.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current?.value));
        }

        if (passwordRef.current?.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current?.value));
        }

        Promise.all(promises)
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError('Failed to update account');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group id='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id='password' className='my-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Form.Group id='confirm-password' className='my-2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={confirmPasswordRef}
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='w-100 my-4'
                        >
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/'>Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;
