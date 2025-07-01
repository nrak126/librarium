import InquiryForm from "./components/InquiryForm";
import style from "./style/index.module.scss";

const questions = [
  {
    question:
      "1. ユーザーが直接触れる、見た目や使いやすさを追求することに最も情熱を感じる。",
  },
  {
    question:
      "2. 目には見えない裏側で、大規模なデータやリクエストを効率よく処理する仕組み作りに興味がある。",
  },
  {
    question:
      "3. ソフトウェアだけでなく、電子回路やセンサーといった物理的な「モノ」と連携させることにワクワクする。",
  },
  {
    question:
      "4. 数学や物理学を応用して、リアルな仮想空間やインタラクティブな体験を創り出すことに関心がある。",
  },
  {
    question:
      "5. システムの弱点を見つけ出し、攻撃から守るための戦略を考えることに知的なスリルを感じる。",
  },
  {
    question:
      "6. スマートフォンの限られた画面や機能を最大限に活かした、快適なアプリ開発に魅力を感じる。",
  },
  {
    question:
      "7. サービスを止めずに安定稼働させるための、自動化の仕組みや基盤を構築するのが好きだ。",
  },
  {
    question:
      "8. はんだ付けやブレッドボードでの試作など、自分の手で物理的なプロトタイプを組み立てる作業が好きだ。",
  },
  {
    question:
      "9. 機能を作ること以上に、ユーザーが抱える根本的な課題を発見し、解決に導くプロセスを重視する。",
  },
  {
    question:
      "10. 作ったものがすぐにインターネットを通じて、多くの人の目に触れたり使われたりすることに喜びを感じる。",
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
