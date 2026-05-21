import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  familyName: z.string().min(2, 'Family name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  function onSubmit(data: FormData) {
    registerUser(data)
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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                className={`form-control rounded-0 ${errors.firstName ? 'is-invalid' : ''}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="familyName" className="form-label">Family Name</label>
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

            <div className="mb-4">
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
