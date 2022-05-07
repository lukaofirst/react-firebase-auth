import { useState } from 'react';
import { FormEvent } from 'react';
import { useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { resetPassword } = useAuth();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current?.value!);
            setMessage('Check your inbox for further instructions');
        } catch (error) {
            setError('Failed to reset password');
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group id='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='w-100 my-4'
                        >
                            Reset Password
                        </Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/login'>Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an Account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    );
};

export default ForgotPassword;
