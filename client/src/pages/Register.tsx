import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'

// Schema defines the validation rules. Zod also infers the TypeScript type,
// so we don't have to write the interface separately.
const schema = z.object({
  firstName:       z.string().min(2, 'First name must be at least 2 characters'),
  familyName:      z.string().min(2, 'Last name must be at least 2 characters'),
  email:           z.email('Please enter a valid email address'),
  password:        z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function Register() {
  // AuthContext's register function is renamed here to avoid clashing with
  // react-hook-form's register function, which is also used below.
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // 'onChange' validates on every keystroke so the button activates
    // the moment all three fields are valid — no need to blur or submit first.
    mode: 'onChange',
  })

  function onSubmit(data: FormData) {
    const { password, confirmPassword: _, ...user } = data
    const ok = registerUser(user, password)
    if (!ok) {
      setError('email', { message: 'This email is already registered' })
      return
    }
    navigate('/')
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div
          className="mx-auto p-5 bg-white shadow-sm border"
          style={{ maxWidth: 480 }}
        >
          <h2 className="text-center fw-bold mb-4">Create Account</h2>
          <p className="text-center text-muted mb-4">
            Sign up to personalise your experience
          </p>

          {/* noValidate disables the browser's built-in validation so
              only our Zod rules are shown, not the browser's default popups. */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                // is-invalid adds Bootstrap's red border when there's an error
                className={`form-control rounded-0 ${errors.firstName ? 'is-invalid' : ''}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="familyName" className="form-label">Last Name</label>
              <input
                type="text"
                id="familyName"
                className={`form-control rounded-0 ${errors.familyName ? 'is-invalid' : ''}`}
                {...register('familyName')}
              />
              {errors.familyName && (
                <div className="invalid-feedback">{errors.familyName.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                {...register('password')}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control rounded-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>

            {/* disabled until every field passes validation */}
            <button
              type="submit"
              className="btn btn-dark w-100 py-2 rounded-0 mb-2"
              disabled={!isValid}
            >
              REGISTER
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 py-2 rounded-0"
              onClick={() => navigate('/')}
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
