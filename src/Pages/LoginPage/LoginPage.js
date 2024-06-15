import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { message, Input } from 'antd';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Admin');
      message.success('Login successful !');
    } catch (error) {
      console.log(error);
      message.error('wrong password or email !');
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2 className="logo">Login</h2>
        <span className="form-element-lable">Email</span>
        <div className="form-element">
          <Input
            className="form-element-input"
            placeholder="input Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <span className="form-element-lable">Password</span>
        <div className="form-element">
          <Input.Password
            className="form-element-input"
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="form-element-button outlined-button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
