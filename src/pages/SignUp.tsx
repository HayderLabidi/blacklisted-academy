import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Home } from 'lucide-react';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      // TODO: Implement actual registration logic here
      // For now, we'll just simulate a successful registration
      signIn();
      toast.success('Successfully signed up!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to sign up. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google Sign Up
    toast.info('Google Sign Up coming soon!');
  };

  const handleFacebookSignUp = () => {
    // TODO: Implement Facebook Sign Up
    toast.info('Facebook Sign Up coming soon!');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Return to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
      >
        <Home className="w-5 h-5" />
        <span>Return to Home</span>
      </button>

      <div className="glass-panel w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        
        {/* Social Sign Up Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 py-3 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            onClick={handleFacebookSignUp}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#166FE5] py-3 rounded-full transition-colors"
          >
            <Facebook className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with email</span>
          </div>
        </div>

        {/* Email Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              className="bg-white/5 border-white/10 text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-white/5 border-white/10 text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="bg-white/5 border-white/10 text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="bg-white/5 border-white/10 text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full glass-button">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-blue-400 hover:text-blue-300"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp; 