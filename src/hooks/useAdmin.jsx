import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} = UseAuth()
    const axiosSecure = useAxiosSecure()
  const {data: isAdmin} = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/user/admin/${user?.email}`)
        console.log(res.data)
        return res.data?.admin
    }

  })
  return [isAdmin]
};

export default useAdmin;