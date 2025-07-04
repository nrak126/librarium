"use client";


import styles from "./index.module.scss";

type LoanPeriodProps = {
  setLoanPeriod: (value: number) => void;
  setError: (value: boolean) => void;
  setRawValue?: (value: string) => void;
};
export function LoanPeriod({ setLoanPeriod, setError, setRawValue }: LoanPeriodProps) {


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value;
    if (!rawValue) {
      setError(true);
      return;
    }
    setError(false);

    const value = Number(rawValue);

    if(setRawValue) {
      setRawValue(rawValue);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(today);

    if (value <= 28) {
      targetDate.setDate(today.getDate() + value);
    } else {
      const monthsToAdd = value - 28;
      targetDate.setMonth(today.getMonth() + monthsToAdd);
    }
    const timestamp = targetDate.getTime();
    setLoanPeriod(timestamp);


  };

  return (
    <div className={styles.selectbox} id="selectbox">
      <div className={styles.periodselect}>
        <div className={styles.periodafter}>
          <select
            name=""
            id=""
            className={styles.periodbox}
            onChange={handleChange}
          >
            <option value="7">1週間</option>
            <option value="14">2週間</option>
            <option value="21">3週間</option>
            <option value="28">4週間</option>
            <option value="29">1ヶ月</option>
            <option value="30">2ヶ月</option>
            <option value="31">3ヶ月</option>
            <option value="32">4ヶ月</option>
            <option value="33">5ヶ月</option>
            <option value="34">半年</option>
          </select>
        </div>
      </div>
    </div>
  );
}
