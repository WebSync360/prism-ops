import Login from './Login'

export default function Signup() {
  // We are just reusing the Login component logic
  // Since the state inside Login defaults to isSignUp=false, 
  // you can either leave it as is (users can toggle) 
  // or use the logic below to ensure it's on Signup mode.
  return <Login /> 
}