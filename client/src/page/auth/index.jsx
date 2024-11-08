
// import Background from '@/assets/vertopal.com_background.svg';
import Victory from '@/assets/victory.svg';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { TabsTrigger, TabsContent } from '@/components/ui/tabs';
import  { Button }  from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from '@/lib/api-client';
import { SIGNUP_ROUTE } from '@/utils/constants';
import { LOGIN_ROUTE } from '@/utils/constants';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stroy';



const Auth = () => {
  const navigate = useNavigate()
  const {setUserInfo} = useAppStore() 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }
    return true;
  };


  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }
    if (password != confirmpassword) {
      toast.error("password and confirmpassword are same");
      return false;
    }
    return true;
  };




  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      if (response.data.user.id) {
        //console.log(response.data.user.profileSetup)
        setUserInfo(response.data.user)
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
        
      }
      console.log({ response });

    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status == 201) {
        setUserInfo(response.data.user)
        navigate("/profile");
        
      }
      console.log({ response });
    }

  };




  return <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-Background">
    <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[60vw] lg:w-[60vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2" >
      <div className="flex flex-col gap-10 items-center justify-center relative">

        <div className="FLEX items-center justify-center flex-col">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold md:text-3xl items-center justify-center"> WELCOME</h1>
            <img src={Victory} alt="victory emogy" className='h-[100px]' />
          </div >
          <p className=' flex font-medium text-center justify-center flex-col '> get started with the chat app </p>

        </div>
        <div className='flex items-center justify-center w-full'>
          <Tabs className='w-3/4' defaultValue='login'>
            <TabsList className=' flex flex-col bg-transparent rounded-none w-full'>
              <TabsTrigger value="login" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 gap-2'>Login</TabsTrigger>
              <TabsTrigger value="signup" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className='flex flex-col gap-5 mt-10'>
              <input placeholder='Email' type='email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input placeholder='Password' type='password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="rounded-full p-6" onClick={ handleLogin }>Login</Button>
            </TabsContent>
            <TabsContent value="signup" className='flex flex-col gap-3 mt-3'>
              <input placeholder='Email' type='email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input placeholder='Password' type='password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)} />
              <input placeholder='ConfirmPassword' type='confirmpassword' className='rounded-full p-6' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <Button className="rounded-full p-6" onClick={ handleSignup }>Signup</Button> 
            </TabsContent>
          </Tabs>
        </div>

      </div>
      {/* <div className='hidden xl:flex justify-center items-center'>
        <img src={Background} alt="background" className='h-[700px]' />
      </div> */}
    </div>

  </div >
};
export default Auth;
