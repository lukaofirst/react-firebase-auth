import { useState } from 'react';
import { FormEvent } from 'react';
import { useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current?.value!, passwordRef.current?.value!);
            navigate('/');
        } catch (error) {
            setError('Failed to create an account');
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group id='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group id='password' className='my-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group id='confirm-password' className='my-2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={confirmPasswordRef}
                                required
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='w-100 my-4'
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Log In</Link>
            </div>
        </>
    );
};

export default SignUp;
