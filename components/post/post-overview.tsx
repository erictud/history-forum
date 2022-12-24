import styles from "./post-overview.module.css";
import Link from "next/link";
import LikeIconShape from "../../icons/LikeIconShape";
import LikeIconFilled from "../../icons/LikeIconFilled";

export default function PostOverview(props: {
  title: string;
  id: string;
  date: string;
  description: string;
  numberOfLikes: number;
  user: string;
  img: string | null;
}) {
  const { title, id, description, numberOfLikes, img, user, date } = props;
  return (
    <>
      <div className={styles["post-overview"]}>
        <div className={styles["swords-number"]}>
          <LikeIconShape />
          <span>{numberOfLikes}</span>
        </div>
        <div className={styles["post-info"]}>
          <div className={styles["first-row"]}>
            <Link href={`/users/${user}`}>
              <p>u/{user}</p>
            </Link>
            <p>
              {new Date(date).toLocaleString("en", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className={styles["second-row"]}>
            <h3>{title}</h3>
            <p>{description.slice(0, 150)}...</p>
          </div>
          {img && (
            <>
              <details>
                <summary>Vezi imaginea</summary>
                <div className={styles["third-row"]}>
                  <img src={img} alt={title} />
                </div>
              </details>
            </>
          )}
        </div>
      </div>
    </>
  );
}
