import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faStar,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className={`w-full h-full pt-14 pb-24 flex flex-col ${ isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-600"} `}>
      <div className="mb-5">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content w-11 rounded-full flex items-center justify-center">
              <span className="text-2xl">AI</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className={`text-4xl font-bold mb-9 ${ isDarkMode ? "text-white" : "text-black"}`}>Profile User</h2>
      <ul className="flex flex-col justify-start space-y-7 pl-32">
        <li className="flex justify-start">
          <FontAwesomeIcon
            icon={faUserEdit}
            className="text-blue-500 mr-2 w-8 h-10"
          />
          <a
            href="/ubah-profile"
            className="hover:text-blue-500 text-2xl font-serif pl-7 pt-2"
          >
            Edit Profile
          </a>
        </li>
        <li className="flex items-center">
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-500 mr-2 w-8 h-10"
          />
          <Link 
            to="/rating"
            className="hover:text-blue-500 text-2xl font-serif pl-7 pt-2"
          >
            Rating
          </Link>
        </li>
        <li className="flex justify-start">
          <FontAwesomeIcon
            icon={faCog}
            className="text-gray-500 mr-2 w-8 h-10"
          />
          <a
            href="/pengaturan"
            className="hover:text-blue-500 text-2xl font-serif pl-7 pt-2"
          >
            Pengaturan
          </a>
        </li>
        <li className="flex justify-start">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-red-500 mr-2 w-8 h-10"
          />
          <a
            href="/logout"
            className="hover:text-blue-500 text-2xl font-serif pl-7 pt-2"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePage;
