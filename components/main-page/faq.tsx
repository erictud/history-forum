import FaqItem from "./faq-item";
import styles from "./faq.module.css";

const faqList = [
  {
    question: "Which is the froum's purpose",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam quam, praesentium quasi, debitis voluptatibus quod perspiciatis voluptate reprehenderit a, accusantium optio possimus laborum. Facere, laudantium quod fugit eveniet excepturi, possimus culpa ea itaque assumenda odio voluptate accusamus autem ducimus explicabo rem ex earum iste voluptatibus cumque nesciunt dolor quas perferendis, eius recusandae! Expedita, nam reprehenderit in voluptate dicta laudantium soluta facere autem ut blanditiis, sunt facilis molestiae ea quibusdam adipisci et. Dolore reiciendis nisi est porro modi doloremque, dolorum mollitia ad non ratione earum, voluptate fugiat ullam accusamus explicabo deleniti recusandae sed vero officiis placeat! Repellendus enim voluptatum quam blanditiis?        ",
  },
  {
    question: "Which types of stamps can we post about",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam quam, praesentium quasi, debitis voluptatibus quod perspiciatis voluptate reprehenderit a, accusantium optio possimus laborum. Facere, laudantium quod fugit eveniet excepturi, possimus culpa ea itaque assumenda odio voluptate accusamus autem ducimus explicabo rem ex earum iste voluptatibus cumque nesciunt dolor quas perferendis, eius recusandae! Expedita, nam reprehenderit in voluptate dicta laudantium soluta facere autem ut blanditiis, sunt facilis molestiae ea quibusdam adipisci et. Dolore reiciendis nisi est porro modi doloremque, dolorum mollitia ad non ratione earum, voluptate fugiat ullam accusamus explicabo deleniti recusandae sed vero officiis placeat! Repellendus enim voluptatum quam blanditiis?        ",
  },
  {
    question: "How can I be banned",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam quam, praesentium quasi, debitis voluptatibus quod perspiciatis voluptate reprehenderit a, accusantium optio possimus laborum. Facere, laudantium quod fugit eveniet excepturi, possimus culpa ea itaque assumenda odio voluptate accusamus autem ducimus explicabo rem ex earum iste voluptatibus cumque nesciunt dolor quas perferendis, eius recusandae! Expedita, nam reprehenderit in voluptate dicta laudantium soluta facere autem ut blanditiis, sunt facilis molestiae ea quibusdam adipisci et. Dolore reiciendis nisi est porro modi doloremque, dolorum mollitia ad non ratione earum, voluptate fugiat ullam accusamus explicabo deleniti recusandae sed vero officiis placeat! Repellendus enim voluptatum quam blanditiis?        ",
  },
];

export default function FAQ() {
  return (
    <div className={styles["faq-container"]}>
      <h2 className="title">Frequently asked questions:</h2>
      {faqList.map((question, i) => (
        <FaqItem key={i} question={question.question} answer={question.answer} />
      ))}
    </div>
  );
}
