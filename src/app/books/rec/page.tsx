import { RecBtn } from "./components/Btn";
import InquiryForm from "./components/InquiryForm";
import style from "./style/index.module.scss";

const questions = [
  {
    question: "1. 新しいアイデアや技術に挑戦することにワクワクしますか？",
  },
  {
    question: "2. 些細なことでも見た目にこだわらないと気が済まない時がある",
  },
  {
    question:
      "3. 問題を一度に解決するのではなく、段階的に進める方が得意ですか？",
  },
  {
    question:
      "4. 自分の作ったものを、多くの人に使ってもらいたいと思うことが多いですか？",
  },
  {
    question: "5. 物事を構造的に、システム的に考えることに興味がありますか？",
  },
  {
    question: "6. 細かい作業をすることが好きですか？",
  },
  {
    question: "7. 複数の人と協力して目標を達成することにやりがいを感じますか？",
  },
  {
    question:
      "8. 長期間続けて深く学び、専門知識を積み上げていくことが楽しいですか？",
  },
  {
    question:
      "9. 最終的な目標を意識して、計画的に物事を進めることが得意ですか？",
  },
  {
    question: "10. 自分の創造性やアイデアを表現することに喜びを感じますか？",
  },
];

export default function Page() {
  return (
    <>
      <h2 className={style.title}>お勧め診断</h2>
      <div className={style.bar}></div>
      <InquiryForm questions={questions.map((item) => item.question)} />
      
    </>
  );
}
