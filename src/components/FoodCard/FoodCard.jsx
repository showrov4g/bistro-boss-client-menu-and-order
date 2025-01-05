import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseCart from "../../hooks/UseCart";


const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [,refetch] = UseCart()

  const handleAddToCart = () => {
    if (user && user?.email) {
      // send cart item to the data base
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price
      };
      axiosSecure.post('/carts', cartItem)
      .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} add to cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            // refetch the data 
            refetch()
        })



    } else {
      Swal.fire({
        title: "Are you not login",
        text: "please login add the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please, Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div
          onClick={handleAddToCart}
          className="card-actions justify-end"
        >
          <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
