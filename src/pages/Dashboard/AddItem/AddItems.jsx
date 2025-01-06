import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/UseAxiosPublic"
import UseAxiosSecure from "../../../hooks/useAxiosSecure"
import Swal from "sweetalert2";

const AddItems = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
  const { register, handleSubmit } = useForm();
  const onSubmit =async (data) => {
    console.log(data.file[0])
    const imageFile = {image: data.file[0]}
      const res = await axiosPublic.post(image_hosting_api, imageFile,{
        headers:{
          "content-type": "multipart/form-data"
        }
      })
      if(res.data.success){
        const menuitem = {
          name : data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url,
        }
        const menuRes = await axiosSecure.post('/menu', menuitem);
        console.log(menuRes)
        if(menuRes.data.insertedId){
          // show success popup 
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
      // console.log(res.data)

    };
  return (
    <div>
      <SectionTitle
        heading={"Add an item"}
        subHeading={"Whats new"}
      ></SectionTitle>
      {/* form  */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">recipe name name?</span>
          </div>
          <input
            {...register("name",{required:true})}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <div className="flex gap-6">
          {/* category */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category name</span>
            </div>
            <select defaultValue={"default"}
              {...register("category", {required: true})}
              className="w-full border rounded p-3"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="salad">salad</option>
              <option value="pizza">pizza</option>
              <option value="soup">soup</option>
              <option value="desert">desert</option>
              <option value="drink">drink</option>
            </select>
          </label>

          {/* price */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              {...register("price", {required: true})}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        {/* recipe details  */}

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea {...register("category",{required: true})}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </label>
        </div>
        {/* file input  */}
        <div>
        <input {...register("file", {required: true})} type="file" className="file-input w-full max-w-xs" />
        </div>

        <input className="btn" type="submit" value={"submit"}/>
      </form>
    </div>
  );
};

export default AddItems;
