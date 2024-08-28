'use client';

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/input-field';
import { useRouter } from 'next/navigation';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { LoginSchema } from '@/schemas';
import CardWrapper from '@/components/auth/card-wrapper';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { login } from '@/app/lib';
import * as z from "zod";


const Register = () => {
    const [status, setStatus] = useState<{ error?: string; success?: string }>({});
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const submitForm = (data: z.infer<typeof LoginSchema>) => {
        startTransition(async () => {
            try {
                const { data: response } = await axios.post<ApiResponse>("/api/auth/login", data);
                if (!response.success) {
                    setStatus({ error: response.message });
                } else {
                    setStatus({ success: response.message });
                    await login(response.data);
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error(error);
                const axiosError = error as AxiosError<ApiResponse>;
                const errorMessage = axiosError.response?.data?.message || "Something went wrong. Please try again.";
                setStatus({ error: errorMessage });
            }
        });
    };

    return (
        <CardWrapper
            cardTitle="Welcome Back!"
            backText="Don't have an account?"
            backButtonLabel="Register"
            backButtonHref="/register"
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
                    <Button disabled={isPending} type='submit' className='w-full'>
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default Register;
