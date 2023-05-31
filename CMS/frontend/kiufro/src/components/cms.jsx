import { useParams } from "react-router-dom";
import Home from "./home";
import UpdateData from "./update";

function cms() {


  return (
    <div>
      {id ? <UpdateData id={id} /> : <Home />}
    </div>
  );
}

export default cms;