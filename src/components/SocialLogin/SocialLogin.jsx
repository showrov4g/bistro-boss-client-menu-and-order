import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate()
  const handleGoogleLogin = () => {
    googleLogin()
    .then(res=>{
        const userInfo = {
            name: res.user?.displayName,
            email : res.user?.email
        }
        axiosPublic.post("/users", userInfo)
        .then(res=>{
            navigate("/")
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 2500
              });
        })
    })
  };
  return (
    <div>
      <div className="text-center pb-5">
        <button onClick={handleGoogleLogin} className="btn space-x-4">
          <FaGoogle></FaGoogle>
          GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
