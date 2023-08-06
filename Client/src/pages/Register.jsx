import styled from "styled-components";
import { mobile } from "../responsive";
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", work: "", password: "", cpassword: ""
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password, cpassword  //key:value
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Registration Invalid");
    }
    else {
      window.alert("Registration Sucessfull!");
      console.log("Sucessfull Registration");

      Navigate("/login");
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form method="POST">
          <Input placeholder="username" type="text" name="name" id='name' autoComplete='off'
            value={user.name}
            onChange={handleInput} />
          <Input placeholder="email" type="email" name="email" id='email' autoComplete='off'
            value={user.email}
            onChange={handleInput} />
          <Input placeholder="password" type="password" name="password" id='password' autoComplete='off'
            value={user.password}
            onChange={handleInput} />
          <Input placeholder="confirm password" type="password" name="cpassword" id='cpassword' autoComplete='off'
            value={user.cpassword}
            onChange={handleInput} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Input type="submit" name="signup" id='signup' className='form-submit'
            value="Register" onClick={postData}
          />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
