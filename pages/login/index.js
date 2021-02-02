import React, { useState ,useCallback} from 'react';
import { Form ,Input,Button,message} from 'antd';
import 'antd/dist/antd.css'; 
import {RecaptchaComponent} from '../../recaptcha';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from 'axios'
const Login=()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const onFinishHandler = useCallback(async () => {
        console.log("test")
        try {
          const token = await executeRecaptcha("SignIn");
          const recaptchaData = await axios.post(`http://localhost:8080/verify-recaptcha`, {
            response: token,

          });
          console.log('sdasd')
          if (
            recaptchaData &&
            recaptchaData.data &&
            recaptchaData.data.score > 0.5
          ) {
              message.success("sign in successfully")
            
          }
        } catch (error) {
            console.log(error)
         
        }
      }, [email,password]);
    return (
        <div style={{maxWidth:"400px",width:"100%",margin:'0 auto',marginTop:"120px"}}>
            <Form onFinish={onFinishHandler}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input type={'email'} onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.password)} value={password} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default RecaptchaComponent(Login)