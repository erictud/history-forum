import HeroSection from "../components/main-page/hero-section";
import LastPosts from "../components/main-page/last-posts";
import RulesList from "../components/main-page/rules-list";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <HeroSection />
      <LastPosts />
      <RulesList />
    </main>
  );
}
