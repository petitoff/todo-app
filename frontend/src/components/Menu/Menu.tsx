import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import { logout } from "../../store/slices/authSlice";

const Menu = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const handleRedirect = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.menuContainer}>
      <ul onClick={handleRedirect}>
        <li>
          <Link to="/" className={styles.customLink}>
            Home
          </Link>
        </li>
        <li>
          {isAuth ? (
            <div onClick={handleLogout} className={styles.customLink}>
              Logout
            </div>
          ) : (
            <Link to="/login" className={styles.customLink}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
