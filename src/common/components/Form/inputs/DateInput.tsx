import React, { useState } from 'react';
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const YEARS = [...Array(10)].map((item, i) => (2014 + i));

const DateInput = ({ date, dateHandler }) => {
  // const [newDate, setNewDate] = useState({
  //   start_month: '',
  //   start_year: '',
  //   end_month: '',
  //   end_year: '',
  // });
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
    <div className='DateInput'>

      <div className='date-row'>
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

        {/* <div className='dates'>
        </div> */}

      </div>

      <div className='date-row'>
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

        {/* <div className='dates'>
        </div> */}

      </div>
    </div>
  );
};

export default DateInput;
