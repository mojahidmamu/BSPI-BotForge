import { Outlet } from "react-router-dom";

 

const Activities = () => {
    


    return (
       <div>
            <h2 className="text-2xl font-bold">Activities Page</h2>

            {/* Child routes will render here */}
            <Outlet />
        </div>
    );
};

export default Activities;