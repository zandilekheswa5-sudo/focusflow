'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  async function handleSignUp() {
    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // ← saved to Supabase user metadata
        },
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Account created successfully! Check your email.')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f172a',
      }}
    >
      <div
        style={{
          background: '#1e293b',
          padding: '40px',
          borderRadius: '16px',
          width: '380px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: '#a855f7',
            marginBottom: '10px',
          }}
        >
          🎯 FocusFlow
        </h1>
        <p
          style={{
            color: '#cbd5e1',
            marginBottom: '25px',
          }}
        >
          Stay focused. Get things done.
        </p>

        {/* Toggle between login/signup */}
        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
            background: '#0f172a',
            borderRadius: '8px',
            padding: '4px',
          }}
        >
          <button
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: !isSignUp ? '#a855f7' : 'transparent',
              color: 'white',
              fontWeight: 600,
              transition: '0.2s',
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: isSignUp ? '#a855f7' : 'transparent',
              color: 'white',
              fontWeight: 600,
              transition: '0.2s',
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Name field — only shows during sign up */}
        {isSignUp && (
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              borderRadius: '8px',
              border: '1px solid #a855f7',
              background: '#0f172a',
              color: 'white',
              outline: 'none',
            }}
          />
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #a855f7',
            background: '#0f172a',
            color: 'white',
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #a855f7',
            background: '#0f172a',
            color: 'white',
            outline: 'none',
          }}
        />

        {isSignUp ? (
          <button
            onClick={handleSignUp}
            style={{
              width: '100%',
              padding: '12px',
              background: '#a855f7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
          >
            Create Account
          </button>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: '#a855f7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}
