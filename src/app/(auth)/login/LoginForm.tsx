"use client"
import { signInUser } from "@/app/actions/authActions"
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardHeader, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"

const LoginForm = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    })
    const onSubmit = async (data: LoginSchema) => {
        console.log(data);
        const user = await signInUser(data)
        if (user.status === 'success') {
            router.push('/members')
        } else {
            console.log(user.error)
        }
    }
    return (
        <Card className="w-2/5 mx-auto p-4">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-2xl font-semibold">Login</h1>
                    </div>
                </div>
                <p className="text-neutral-500"> Welcome back to NextMatch </p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input
                        defaultValue=""
                        label="Email"
                        variant="bordered"
                        {...register('email')}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message as string}
                    />
                    <Input
                        defaultValue=""
                        label="Password"
                        variant="bordered"
                        type="password"
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message as string}
                    />
                    <Button isLoading={isSubmitting}
                        isDisabled={!isValid} fullWidth color="secondary" type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default LoginForm