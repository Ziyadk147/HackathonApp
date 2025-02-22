import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {auth} from '@/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'firebase/auth'

export default function Registration() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password);
                navigate('/home')
            } catch (error) {
                setErrors({ password: 'Invalid email or password' })
            }
            setSubmitting(false)
        },
    })

    return (
        <Card className="w-[350px] ">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>
                    <CardFooter className="flex justify-between mt-4">
                        <Button type="button">Cancel</Button>
                        <Button type="submit" variant="default" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Signing in...' : 'Login'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
