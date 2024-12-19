import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { login } from '../../../util/api'; // Ensure the login API function is correctly set up
import { isLogIn, storeUserData } from '../../../util/session'; // Ensure session utilities use sessionStorage

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const userNameRef = useRef();
  const userPwdRef = useRef();

  useEffect(() => {
    // Redirect if user is already logged in
    if (isLogIn()) {
      navigate('/'); // Redirect to the home page if logged in
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setValidated(true);

    const email = userNameRef.current?.value;
    const password = userPwdRef.current?.value;

    try {
      // Call the login API
      const resp = await login({ email, password });

      if (resp && resp.token && resp.user) {
        // Store user data including token in sessionStorage
        storeUserData(resp); // Ensure storeUserData uses sessionStorage
        navigate('/'); // Redirect to home after successful login
      } else {
        setErrorMessage('Invalid login response. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('Failed to login. Please provide valid email and password.');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign in to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        ref={userNameRef}
                        id="username"
                        placeholder="Username"
                        autoComplete="username"
                        feedbackInvalid="Please provide a username."
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        ref={userPwdRef}
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        feedbackInvalid="Please provide a password."
                        required
                      />
                    </CInputGroup>

                    {/* Error message display */}
                    {errorMessage && (
                      <CRow className="mb-1 mt-1">
                        <CAlert color="danger">{errorMessage}</CAlert>
                      </CRow>
                    )}

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() => navigate('/TicketForms')}>
                          Contact with us?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
