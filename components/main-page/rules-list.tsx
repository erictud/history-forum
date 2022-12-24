"use client";

import Link from "next/link";
import { useState } from "react";
import ArrRight from "../../icons/ArrRight";
import TickIconCircle from "../../icons/TickIconCIrcle";
import TrophyIcon from "../../icons/TrophyIcon";
import UserGroupIcon from "../../icons/UserGroupIcon";
import styles from "./rules-list.module.css";
const content = [
  {
    title: "All the info has to be verified",
    deatiils:
      " All the info has to be verified Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, tempore ab similique maiores blanditiis ex praesentium quos eaque sequi perspiciatis saepe consequatur provident quas, voluptatibus nesciunt reiciendis architecto ratione vitae recusandae nam quidem tempora quis. Distinctio tenetur ducimus velit error, aliquid neque et accusamus cum inventore quae impedit culpa porro? Commodi doloremque magnam odio aperiam vero dolorem blanditiis id officia quis, nam expedita reiciendis ipsum sunt dolores nulla odit quasi nostrum suscipit excepturi voluptatem quisquam consequuntur minima quia perspiciatis. Nobis enim at, quis, exercitationem dicta temporibus cum quos sapiente corrupti accusantium eaque perspiciatis quasi obcaecati praesentium natus impedit, id recusandae?",
  },
  {
    title: "You have to respect your discussion parteners",
    deatiils:
      "You have to respect your discussion parteners Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, tempore ab similique maiores blanditiis ex praesentium quos eaque sequi perspiciatis saepe consequatur provident quas, voluptatibus nesciunt reiciendis architecto ratione vitae recusandae nam quidem tempora quis. Distinctio tenetur ducimus velit error, aliquid neque et accusamus cum inventore quae impedit culpa porro? Commodi doloremque magnam odio aperiam vero dolorem blanditiis id officia quis, nam expedita reiciendis ipsum sunt dolores nulla odit quasi nostrum suscipit excepturi voluptatem quisquam consequuntur minima quia perspiciatis. Nobis enim at, quis, exercitationem dicta temporibus cum quos sapiente corrupti accusantium eaque perspiciatis quasi obcaecati praesentium natus impedit, id recusandae?",
  },
  {
    title: "All the facts have to be presented in an objective manner",
    deatiils:
      "All the facts have to be presented in an objective manner Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, tempore ab similique maiores blanditiis ex praesentium quos eaque sequi perspiciatis saepe consequatur provident quas, voluptatibus nesciunt reiciendis architecto ratione vitae recusandae nam quidem tempora quis. Distinctio tenetur ducimus velit error, aliquid neque et accusamus cum inventore quae impedit culpa porro? Commodi doloremque magnam odio aperiam vero dolorem blanditiis id officia quis, nam expedita reiciendis ipsum sunt dolores nulla odit quasi nostrum suscipit excepturi voluptatem quisquam consequuntur minima quia perspiciatis. Nobis enim at, quis, exercitationem dicta temporibus cum quos sapiente corrupti accusantium eaque perspiciatis quasi obcaecati praesentium natus impedit, id recusandae?",
  },
];

export default function RulesList() {
  const [selectedRule, setSelectedRule] = useState(0);
  return (
    <div className={styles["rules-list"]}>
      <h3 className="title">Principal rules of the forum</h3>
      <div className={styles["tabbed"]}>
        <div className={styles["btn-row"]}>
          <button
            className={`${styles["btn"]} ${selectedRule === 0 && styles.active}`}
            onClick={() => setSelectedRule(0)}
          >
            Veridicity
          </button>
          <button
            className={`${styles["btn"]} ${selectedRule === 1 && styles.active}`}
            onClick={() => setSelectedRule(1)}
          >
            Respect
          </button>
          <button
            className={`${styles["btn"]} ${selectedRule === 2 && styles.active}`}
            onClick={() => setSelectedRule(2)}
          >
            Corectness
          </button>
        </div>
        <div className={styles["content"]}>
          <div className={styles["content-row"]}>
            {selectedRule === 0 && <TickIconCircle />}
            {selectedRule === 1 && <UserGroupIcon />}
            {selectedRule === 2 && <TrophyIcon />}
            <h4>{content[selectedRule].title}</h4>
          </div>

          <p>{content[selectedRule].deatiils}</p>
        </div>
      </div>
      <Link href="/">
        Read all the rules <ArrRight />
      </Link>
    </div>
  );
}
