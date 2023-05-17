import styles from "./HomePage.module.scss";
import Header from "../components/Header/Header";
import TaskList from "../components/TaskList/TaskList";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePageView}>
        <Header />
        <TaskList />
      </div>
    </div>
  );
};

export default HomePage;
