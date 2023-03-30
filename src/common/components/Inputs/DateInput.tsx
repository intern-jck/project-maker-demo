const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const YEARS = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

type DateType = {
  start_month: string,
  start_year: string,
  end_month: string,
  end_year: string,
};

type Props = {
  date: DateType,
  dateHandler: Function,
};

export default function DateInput({ date, dateHandler }: Props) {

  function updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const newDate = { name: name, value: value };
    dateHandler(newDate);
  };

  return (
    <div className={'dateInput'}>

      <div className={'dateRow'}>
        <span>START:</span>
        <label>
          <select
            name='start_month'
            value={date.start_month}
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
            value={date.start_year}
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

      <div className={'dateRow'}>
        <span>END:</span>
        <label>
          <select
            name='end_month'
            value={date.end_month}
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
            value={date.end_year}
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
