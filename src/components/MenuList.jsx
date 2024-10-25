import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuList = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <Menu
    className={`menu-bar${
      isDarkMode ? "bg-[#001529] text-white" : "bg-white text-black"
    } text-white 
    `}
      theme={isDarkMode ? "dark" : "light"}
      mode="inline"
    >
      <Menu.Item key="home" icon={<HomeOutlined />} className="relative bottom-5">
      <div className="">
        <Link
          to="/"
          className={`block p-2 rounded-md text-base ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Home Page
        </Link>
        </div>
      </Menu.Item>

      <Menu.SubMenu key="subtasks" icon={<AppstoreOutlined />} className={"text-zinc-400"} title={
        <Link className={`block pr-7 rounded-md text-base ${isDarkMode ? "text-zinc-400" : "text-black"}`}>Category</Link>
      }>
        <Menu.Item key="task-1">
          <Link
            to="/movie_list"
            className={`block rounded-md pr-5 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Movie List
          </Link>
        </Menu.Item>
        <Menu.Item key="task-2">
          <Link
            to="/tv_list"
            className={`block rounded-md pr-10 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            TV List
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="heart" icon={<HeartOutlined />} className="relative top-5">
      <div className="">
        <Link
          to="/favorite"
          className={`block p-2 rounded-md text-base ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Favorite
        </Link>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;

// import { Menu } from "antd";
// import {
//   HomeOutlined,
//   AppstoreOutlined,
//   HeartOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// const MenuList = ({ isDarkMode }) => {
//   try {
//     return (
//       <Menu
//         theme={isDarkMode ? "dark" : "light"}
//         mode="inline"
//         className="menu-bar"
//       >
//         <Menu.Item key="home" icon={<HomeOutlined />}>
//           <div className="">
//             <Link to="/">Home Page</Link>
//           </div>
//         </Menu.Item>
//         <Menu.SubMenu
//           key="subtasks"
//           icon={<AppstoreOutlined />}
//           title="Category"
//         >
//           <Menu.Item key="task-1">
//             <div className="">
//               <Link to="/movie_list">Movie List</Link>
//             </div>
//           </Menu.Item>
//           <Menu.Item key="task-2">
//             <div className="">
//               <Link to="/tv_list">Tv List</Link>
//             </div>
//           </Menu.Item>
//         </Menu.SubMenu>

//         <Menu.Item key="heart" icon={<HeartOutlined />}>
//           <div className="">
//             <Link to="/favorite">Favorite</Link>
//           </div>
//         </Menu.Item>
//       </Menu>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default MenuList;
