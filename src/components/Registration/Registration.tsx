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
                const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
                const token = await user.user.getIdToken()
                localStorage.setItem("token" , token)
                navigate('/home')
            } catch (error) {
                setErrors({ password: 'Invalid email or password' })
                localStorage.removeItem("token" )

            }
            setSubmitting(false)
        },
    })

    return (
        <Card >
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
                                className={"border  border-b-4 border-r-4 border-stone-950"}
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
                                className={"border  border-b-4 border-r-4 border-stone-950"}
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>
                    <CardFooter className="flex justify-end mt-4">
                        <Button type="submit" className={"bg-bg border  border-b-4 border-r-4 border-stone-950"} variant="default" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Registering ...' : 'Register'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
