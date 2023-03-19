import { useState } from 'react';
import styles from './DateInput.module.scss';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const YEARS = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

type Props = {
  date: {
    start_month: string | '',
    start_year: string | '',
    end_month: string | '',
    end_year: string | '',
  },
  dateHandler: Function,
}

export default function DateInput({ date, dateHandler }: Props) {

  const [newDate, setNewDate] = useState(date);

  const updateDate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedDate = newDate;
    newDate[name] = value;
    setNewDate(updatedDate);
    dateHandler(updatedDate);
  };

  return (
    <div className={styles.dateInput}>

      <div className={styles.dateRow}>
        <span>
          START DATE:
        </span>
        <label>
          <select
            name='start_month'
            value={newDate.start_month}
            onChange={updateDate}
          >
            <option key='0' value='default'>MONTH</option>
            {
              MONTHS.map((month, i) => (
                <option key={i + 1} value={month}>{month}</option>
              ))
            }
          </select>
        </label>
        <label>
          <select
            name='start_year'
            value={newDate.start_year}
            onChange={updateDate}
          >
            <option key='0' value='default'>YEAR</option>
            {
              YEARS.map((year, i) => (
                <option key={i}>{year}</option>
              ))
            }
          </select>
        </label>
      </div>

      <div className={styles.dateRow}>
        <span>
          END DATE:
        </span>
        <label>
          <select
            name='end_month'
            value={newDate.end_month}
            onChange={updateDate}
          >
            <option key='0' value='default'>MONTH</option>
            <option>Present</option>
            {
              MONTHS.map((month, i) => (
                <option key={i}>{month}</option>
              ))
            }
          </select>
        </label>
        <label>
          <select
            name='end_year'
            value={newDate.end_year}
            onChange={updateDate}
          >
            <option key='0' value='default'>YEAR</option>
            <option>Present</option>
            {
              YEARS.map((year, i) => (
                <option key={i}>{year}</option>
              ))
            }
          </select>
        </label>
      </div>

    </div>
  );
};
