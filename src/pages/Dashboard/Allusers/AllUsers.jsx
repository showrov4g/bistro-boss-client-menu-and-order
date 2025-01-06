import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiDelete } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] , refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user?._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const handleMakeAdmin =(user)=>{
    axiosSecure.patch(`/users/admin/${user?._id}`)
    .then(res=>{
      console.log(res.data)
      if(res.data.modifiedCount> 0){
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now admin`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h1 className="text-3xl">All users</h1>
        <h1 className="text-3xl">Total users</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                {user?.role==="admin" ? "Admin" :  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-ghost btn-lg bg-orange-500 "
                  >
                    <FaUsers className="text-white text-2xl"></FaUsers>
                  </button>}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-lg text-red-700 "
                  >
                    <FiDelete className="text-2xl"></FiDelete>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
