import React from "react";
import NewProject from "../projects/NewProject";
import ListProject from "../projects/ListProject";

const Sidebar = () => {
  return(
    <aside>
      <h1>MERN<span>Tasks</span></h1>

      <NewProject />

      <div className="proyectos">
        <h2>Your Projects</h2>
        <ListProject />
      </div>
    </aside>
  );
}

export default Sidebar;