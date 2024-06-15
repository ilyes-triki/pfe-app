import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Pages/LoginPage/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth, db as firestoreDb } from '../../config/firebase-config';
import { BellFilled, BellOutlined, BellTwoTone } from '@ant-design/icons';
import { BoardContext } from '../../Pages/AdminPanel/BoardsProvider';
import { doc, deleteDoc } from 'firebase/firestore';

import { Dropdown, Badge, Button, message } from 'antd';

import './Navbar.css';

/**
 * Renders a navigation bar component with links to the home page, login page, and admin panel.
 *
 * @return {JSX.Element} The navigation bar component.
 */
export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const isOnLogin = location.pathname === '/Login';
  const navigate = useNavigate();
  const { errorMessages, setErrorMessages } = useContext(BoardContext);
  const [lastErrorCount, setLastErrorCount] = useState(0);

  useEffect(() => {
    if (errorMessages.length > lastErrorCount) {
      setLastErrorCount(errorMessages.length - lastErrorCount);
    }
  }, [errorMessages.length]);

  const handleDelete = async (index) => {
    const messageToDelete = errorMessages[index];
    try {
      const docRef = doc(firestoreDb, 'errorMessages', messageToDelete.id);

      await deleteDoc(docRef);

      const updatedMessages = errorMessages.filter((_, i) => i !== index);
      setErrorMessages(updatedMessages);
      message.success('Deleted successfully !');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  const items = errorMessages.map((message, index) => ({
    label: (
      <div>
        The bulb with the boardnumber {message.board_number} is not working
        <Button onClick={() => handleDelete(index)} danger>
          Delete
        </Button>
      </div>
    ),
    key: index.toString(),
  }));
  const disconnect = async () => {
    await signOut(auth);
    navigate('/');
  };
  const handleBadgeClick = () => {
    setLastErrorCount(0);
  };
  return (
    <div className="navbar">
      <div className="logo">
        <span>Smart Light</span>
      </div>
      <div className="navs">
        <div className="nav-item">
          <Link className="link" to={'/'}>
            <span className="home">Home</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link className="link">
            {' '}
            <span className="aboutUs">About Us</span>{' '}
          </Link>
        </div>
        <div className="nav-item">
          <Link className="link">
            {' '}
            <span className="Contact">Contact Us</span>
          </Link>
        </div>
        {user ? (
          <div className="nav-item">
            <Link className="link" to={'/Admin'}>
              {' '}
              <span className="admin">Admin panel</span>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      {user ? (
        <div className="disconnect-section">
          <button className="outlined-button" onClick={disconnect}>
            disconnect
          </button>
          <div className="nav-notif">
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <Badge count={lastErrorCount} overflowCount={10}>
                {/* <BellFilled
                  style={{ fontSize: '30px' }}
                  onClick={handleBadgeClick}
                /> */}
                {/* <BellOutlined
                  style={{ fontSize: '30px' }}
                  onClick={handleBadgeClick}
                /> */}
                <BellTwoTone
                  style={{ fontSize: '30px' }}
                  onClick={handleBadgeClick}
                />
              </Badge>
            </Dropdown>
          </div>{' '}
        </div>
      ) : !isOnLogin ? (
        <Link to={'/Login'}>
          <button className="outlined-button">Login</button>
        </Link>
      ) : (
        <span></span>
      )}
    </div>
  );
}
