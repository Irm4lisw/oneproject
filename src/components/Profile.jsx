import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Link to ="/profile" >
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              <span className="text-xl">AI</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
