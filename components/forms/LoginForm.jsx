'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoginBtn, TextField } from '@/components'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from 'utils'

const LoginForm = props => {
  //? Props
  const { isLoading, onSubmit } = props

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setFocus,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <TextField
        errors={formErrors.email}
        placeholder="Enter your email"
        name="email"
        control={control}
      />

      <TextField
        errors={formErrors.password}
        type="password"
        placeholder="Enter your password"
        name="password"
        control={control}
      />
      <LoginBtn isLoading={isLoading} style={{ width: '100%' }}>
        Sign in
      </LoginBtn>
    </form>
  )
}

export default LoginForm
