'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import InputField  from '@/components/input-field';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/schemas';
import CardWrapper from '@/components/auth/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { generateToken } from '@/app/lib';
import * as z from "zod";
import { useLoginMutation } from '@/store/baseApi';



const Login = () => {
    const [status, setStatus] = useState<{ error?: string; success?: string }>({});
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    useEffect(() => {
        if (isError) {
            const errorMessage = error as {
                data: { message: string }
            };
            setStatus({ error: errorMessage.data.message });
        }
    }, [isError]);

    const submitForm = async (data: z.infer<typeof LoginSchema>) => {
        const res = await login(data);
        if (res.data?.success) {
            setStatus({ success: res.data.message });
            await generateToken(res.data.data);
            router.push('/dashboard');
        }
    };

    return (
        <CardWrapper
            cardTitle="Welcome Back!"
            backText="Don't have an account?"
            backButtonLabel="login"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className='space-y-5'>
                    <InputField
                        name='email'
                        label='Email'
                        placeholder='Your email address'
                        control={form.control}
                    />
                    <InputField
                        name='password'
                        type='password'
                        label='Password'
                        placeholder='Enter password'
                        control={form.control}
                    />
                    {status.error && <FormError message={status.error} />}
                    {status.success && <FormSuccess message={status.success} />}
                    <Button disabled={isLoading} type='submit' className='w-full'>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default Login;
