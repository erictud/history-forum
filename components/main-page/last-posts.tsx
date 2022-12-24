import Link from "next/link";
import ArrDown from "../../icons/ArrDown";
import PostOverview from "../post/post-overview";
import styles from "./last-posts.module.css";

const postData = [
  {
    title: "First romanian stamps",
    description: "Which are the first romanian stamps? Who was the stamp from",
    date: "12-22-2022",
    img: null,
    id: "p1",
    user: "Adi Eric",
    numberOfLikes: 21,
  },
  {
    title: "Communist stamps",
    description: "Which are the first romanian stamps? Who was the stamp from>",
    date: "6-5-2022",
    img: "/herosection-cover-landing.jpg",
    id: "p2",
    user: "Tudorica Alina",
    numberOfLikes: 21,
  },
  {
    title: "The most valubale stamp in history",
    description: "Which are the first romanian stamps? Who was the stamp from>",
    date: "11-12-2022",
    img: null,
    id: "p3",
    user: "Tudorica Eric",
    numberOfLikes: 21,
  },
];

export default function LastPosts() {
  return (
    <div className={styles["container"]}>
      <h3 className="title">Latest posts</h3>
      <div className={styles["posts-list"]}></div>
      {postData.map((el, i) => (
        <PostOverview
          key={i}
          date={el.date}
          user={el.user}
          id={el.id}
          title={el.title}
          description={el.description}
          img={el.img}
          numberOfLikes={el.numberOfLikes}
        />
      ))}
      <Link href="/">
        See more posts <ArrDown />
      </Link>
    </div>
  );
}
