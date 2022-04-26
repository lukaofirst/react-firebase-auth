import { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    <Form>
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
                                type='confirm-password'
                                ref={confirmPasswordRef}
                                required
                            />
                        </Form.Group>
                        <Button type='submit' className='w-100 my-4'>
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? Log In
            </div>
        </>
    );
};

export default SignUp;
