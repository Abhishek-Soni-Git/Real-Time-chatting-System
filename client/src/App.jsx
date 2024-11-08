// import { Button } from "@/components/ui/button"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./page/auth";
import Chat from "./page/chat";
import Profile from "./page/profile";
import { children, useEffect, useState } from "react";
import { useAppStore } from "./stroy";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  //console.log("private", userInfo ? true : false, userInfo)
  const isAuthenticated = userInfo ? true : false;
  return isAuthenticated ? children : <Navigate to="/auth" />

};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  //console.log("auth",userInfo,userInfo.profileSetup);
  const isAuthenticated = userInfo ? true : false;
  return isAuthenticated ? userInfo ? userInfo.profileSetup ? <Navigate to="/chat" /> : <Navigate to="/profile" /> : children : children;

};



const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    const getUserData = async () => { 
      
      try {
        const response = await apiClient.get("/"+GET_USER_INFO,{
          withCredentials:true,
        });
       // console.log("getuserdata call",response);
        if(response.status == 200 && response.data.user.id) {
          
          setUserInfo(response.data.user);
        } else {
          setUserInfo(undefined);
        }
        console.log({response});
      } catch (error) {
        setUserInfo(undefined);
      }
      finally{
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else { 
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading....</div>
    
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute>
          <Auth />
        </AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />

      </Routes>
    </BrowserRouter>
  );
};
export default App;
