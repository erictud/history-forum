import Link from "next/link";
import ArrDown from "../../icons/ArrDown";
import PostOverview from "../post/post-overview";
import styles from "./last-posts.module.css";

const postData = [
  {
    title: "Unirea de la 1600 - consecinte",
    description:
      "Care sunt consecintele unirii de la 1600 pe termen scurt? Au fost benefice pt poporul roman din zonele subjugate precum Basarabia sau Transilvania",
    date: "12-22-2022",
    img: null,
    id: "p1",
    user: "Adi Eric",
    numberOfLikes: 21,
  },
  {
    title: "Unirea de la 1600 - consecinte",
    description:
      "Care sunt consecintele unirii de la 1600 pe termen scurt? Au fost benefice pt poporul roman din zonele subjugate precum Basarabia sau Transilvania",
    date: "6-5-2022",
    img: "/herosection-cover-landing.jpg",
    id: "p2",
    user: "Tudorica Alina",
    numberOfLikes: 21,
  },
  {
    title: "Unirea de la 1600 - consecinte",
    description:
      "Care sunt consecintele unirii de la 1600 pe termen scurt? Au fost benefice pt poporul roman din zonele subjugate precum Basarabia sau Transilvania",
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
      <h3 className="title">Ultimele postari</h3>
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
        Vezi mai multe postari <ArrDown />
      </Link>
    </div>
  );
}
