const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const YEARS = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
import { SelectInput } from '@/common/components/Inputs';

type DateType = {
  start_month: string,
  start_year: string,
  end_month: string,
  end_year: string,
};

type Props = {
  className: string,
  date: DateType,
  changeHandler: React.ChangeEventHandler,
};

export default function DateInput({ className, date, changeHandler }: Props) {
  return (
    <div className={className}>

      <div className='dateRow'>
        <SelectInput
          className={'dateSelect'}
          inputName='start_month'
          value={date['start_month']}
          options={MONTHS}
          changeHandler={changeHandler}
        />
        <SelectInput
          inputName='start_year'
          value={date['start_year']}
          options={YEARS}
          changeHandler={changeHandler}
        />
      </div>
      <div className='dateRow'>
        <SelectInput
          inputName='end_month'
          value={date['end_month']}
          options={MONTHS}
          changeHandler={changeHandler}
        />
        <SelectInput
          inputName='end_year'
          value={date['end_year']}
          options={YEARS}
          changeHandler={changeHandler}
        />
      </div>

    </div>
  );
};
