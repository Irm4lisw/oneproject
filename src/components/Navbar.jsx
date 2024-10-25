import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styleNavbar.scss";
import Logo from "./Logo";
import MenuList from "./MenuList";
import { useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/reducer/themeSlice";

const { Header, Sider } = Layout;

const Navbar = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleTheme = () => {
    console.log(isDarkMode);
    dispatch(toggleDarkMode());
  };

  return (
    <div>
      <div className="root">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            theme={isDarkMode ? "dark" : "light"}
            className="sidebar"
            style={{ position: "fixed", height: "100vh", zIndex: 10 }}
          >
            <div className={`sidebar ${collapsed ? "collapsed" : ""} mb-8`}>
              <Logo showText={!collapsed} />
            </div>
            <MenuList  />
          </Sider>

          <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Header
              style={{
                padding: 0,
                background: isDarkMode ? "#001529" : "#ffffff", 
                position: "fixed",
                zIndex: 10,
                width: "100%",
              }}
            >
              <div className="pl-6 pt-4">
                <div className="flex justify-start">
                  <Button
                    type="text"
                    onClick={() => setcollapsed(!collapsed)}
                    style={{ color: isDarkMode ? "white" : "black" }}
                    icon={
                      collapsed ? (
                        <MenuUnfoldOutlined
                          style={{ color: isDarkMode ? "white" : "black" }}
                        />
                      ) : (
                        <MenuFoldOutlined
                          style={{ color: isDarkMode ? "white" : "black" }}
                        />
                      )
                    }
                  />
                  <div style={{ marginLeft: collapsed ? 1000 : 870 }}>
                    <div className="flex justify-end relative ml-auto bottom-3 pr-32">
                      <div className="mr-3">
                        <Profile />
                      </div>
                      <div className="">
                        <Button onClick={toggleTheme}>
                          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Header>
            <div style={{ marginTop: 64, marginLeft: 0 }}>{children}</div>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import { Button, Layout } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
// import "./styleNavbar.scss";
// import Logo from "./Logo";
// import MenuList from "./MenuList";
// import { useState } from "react";
// import ToggleThemeButton from "./ToggleThemeButton";
// import Profile from "./Profile";

// const { Header, Sider } = Layout;

// const Navbar = ({ children }) => {
//   const [darkTheme, setDarkTheme] = useState(true);
//   const [collapsed, setcollapsed] = useState(false);

//   const toggleTheme = () => {
//     setDarkTheme(!darkTheme);
//   };

//   return (
//     <div>
//       <div className="root">
//         <Layout style={{ minHeight: "100vh" }}>
//           <Sider
//             collapsed={collapsed}
//             collapsible
//             trigger={null}
//             theme={darkTheme ? "dark" : "light"}
//             className="sidebar"
//             style={{ position: "fixed", height: "100vh", zIndex: 10 }} // Memastikan Sider tetap di tempat
//           >
//             <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//               <Logo showText={!collapsed} />
//             </div>

//             <MenuList darkTheme={darkTheme} />
//           </Sider>

//           <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
//             <Header
//               style={{
//                 padding: 0,
//                 background: darkTheme ? "#001529" : "#ffffff", // Change these colors as needed
//                 position: "fixed",
//                 zIndex: 10,
//                 width: "100%",
//               }}
//             >
//               <div className="pl-6 pt-4">
//                 <div className="flex justify-start">
//                   <Button
//                     type="text"
//                     onClick={() => setcollapsed(!collapsed)}
//                     style={{ color: darkTheme ? "white" : "black" }}
//                     icon={
//                       collapsed ? (
//                         <MenuUnfoldOutlined
//                           style={{ color: darkTheme ? "white" : "black" }}
//                         />
//                       ) : (
//                         <MenuFoldOutlined
//                           style={{ color: darkTheme ? "white" : "black" }}
//                         />
//                       )
//                     }
//                   />
//                   <div style={{ marginLeft: collapsed ? 1000 : 870 }}>
//                     <div className="flex justify-end relative ml-auto bottom-3 pr-32">
//                       <div className="mr-3">
//                         <Profile />
//                       </div>
//                       <ToggleThemeButton
//                         darkTheme={darkTheme}
//                         toggleTheme={toggleTheme}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Header>
//             <div style={{ marginTop: 64, marginLeft: 0 }}>{children}</div>
//           </Layout>
//         </Layout>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // import React from "react";
// import { Button, Layout, theme } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
// import "./styleNavbar.scss";
// import Logo from "./Logo";
// import MenuList from "./MenuList";
// import { useState } from "react";
// import ToggleThemeButton from "./ToggleThemeButton";
// import Profile from "./Profile";

// const { Header, Sider } = Layout;
// const Navbar = ({ children }) => {
//   const [darkTheme, setDarkTheme] = useState(true);
//   const [collapsed, setcollapsed] = useState(false);

//   const toggleTheme = () => {
//     setDarkTheme(!darkTheme);
//   };

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   try {
//     return (
//       <div>
//         <div className="root ">
//           <Layout>
//             <Sider
//               collapsed={collapsed}
//               collapsible
//               trigger={null}
//               theme={darkTheme ? "dark" : "light"}
//               className="sidebar"
//             >
//               <Logo />
//               <MenuList darkTheme={darkTheme} />
//             </Sider>

//             <Layout>
//               <Header style={{ padding: 0, background: colorBgContainer }}>
//                 <div className="pl-6 pt-4">
//                   <div className="flex justify-start">
//                     <Button
//                       className=""
//                       type="text"
//                       onClick={() => setcollapsed(!collapsed)}
//                       darkTheme={darkTheme}
//                       icon={
//                         collapsed ? (
//                           <MenuUnfoldOutlined />
//                         ) : (
//                           <MenuFoldOutlined />
//                         )
//                       }
//                     />

//                     <div className="flex justify-end relative ml-auto bottom-3 pr-3">
//                       <div className="mr-3">
//                         <Profile />
//                       </div>
//                       <ToggleThemeButton
//                         darkTheme={darkTheme}
//                         toggleTheme={toggleTheme}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Header>

//               <div className="">{children}</div>
//             </Layout>
//           </Layout>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default Navbar;
