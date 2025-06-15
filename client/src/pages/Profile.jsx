import Layout from "../component/layout/layout";
import profileimg from "../assets/images/profile.jpg";
import { Link } from "react-router-dom";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const user = {
    name: 'Saiful islam',
    bio: 'A passionate web developer with expertise in React and JavaScript.',
    location: 'Cumilla',
    profilePicture: profileimg,
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
      linkedin: 'https://www.linkedin.com/in/johndoe/',
    },
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/login'; // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <Layout>
        <div className="profile-container">
        <button className="p-2 m-2  btn btn-primary " data-toggle="button" aria-pressed="false"><Link to="/profileForm" className="text-light" >ProfileForm</Link></button>
      <div className="profile-header mt-3">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-location">{user.location}</p>
      </div>

      <div className="profile-links">
        <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
    </Layout>
    
  );
};

export default Profile;