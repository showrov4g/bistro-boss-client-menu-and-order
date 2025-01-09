import { use } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";

const UpdateItem = () => {
    
    return (
        <div>
            <SectionTitle heading={'update an Item'} subHeading={'Update information'}></SectionTitle>
        </div>
    );
};

export default UpdateItem;