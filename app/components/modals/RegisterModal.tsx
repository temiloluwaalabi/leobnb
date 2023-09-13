'use client'
import {signIn} from "next-auth/react"
import axios from 'axios'
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModel';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Inupt';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from "@/app/hooks/useLoginModel";
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                toast.success("Registered Successfully!")
                registerModal.onClose()
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome to Airbnb' 
                subtitle='Create an account!' 
            />
            <Input 
                id='email'
                label='Email'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='name'
                label='Name'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                type='password'
                label='Password'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />

        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                click={() => signIn('google')}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                click={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex justify-center flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={loading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal