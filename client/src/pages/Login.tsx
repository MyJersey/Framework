import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'

// run on keystroke [see 27]
const schema = z.object({
  email:    z.email('Please enter a valid email address'),  // implicit regex
  password: z.string().min(1, 'Password is required'),      // check only if it's empty
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  function onSubmit(data: FormData) {
    const ok = login(data.email, data.password)
    if (ok) {
      navigate('/')
    } else {
      setLoginError(true)
    }
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div
          className="mx-auto p-5 bg-white shadow-sm border"
          style={{ maxWidth: 480 }}
        >
          <h2 className="text-center fw-bold mb-4">Sign In</h2>
          <p className="text-center text-muted mb-4">
            Welcome back to Natural Skincare
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}  // is-invalid sets red borders
                {...register('email', { onChange: () => setLoginError(false) })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', { onChange: () => setLoginError(false) })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>

            {loginError && (
              <div className="alert alert-danger py-2 rounded-0" role="alert">
                Incorrect email or password.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-dark w-100 py-2 rounded-0 mb-2"
              disabled={!isValid}
            >
              SIGN IN
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 py-2 rounded-0"
              onClick={() => navigate('/')}
            >
              CANCEL
            </button>
          </form>

          <p className="text-center text-muted mt-4 mb-0" style={{ fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-dark fw-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
