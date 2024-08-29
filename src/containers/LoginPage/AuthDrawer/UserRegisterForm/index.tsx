import { useState } from 'react';

type RegisterFormProps = {
  switchToLogin: () => void;
};

const UserRegisterForm: React.FC<RegisterFormProps> = () => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const plusIndex = (n: number) => {
    setCurrIndex((prev) => prev + n);
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    plusIndex(1);
  };

  return (
    <div className="register">
      <strong>Sign up</strong>
      <div className="login-progress-bar">
        <ul>
          <div className="progress"></div>
          {['Name', 'Contact', 'Birth', 'Submit'].map((item, index) => (
            <li key={item} data-title={item} className={`${currIndex >= index ? 'active' : ''} `}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="wrapper" style={{ marginLeft: `${currIndex * -100}% ` }}>
        {/* Basic Info */}
        <form onSubmit={handleNext}>
          {/* First Name */}
          <label>
            First Name<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.firstName ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>

            <input style={{ paddingLeft: '8px' }} type="text" required />
          </div>
          {/* {errors.firstName && <div className="text-danger small">{errors.firstName.message}</div>} */}

          {/* Last Name */}
          <label>
            Last Name<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.lastName ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>
            <input style={{ paddingLeft: '8px' }} type="text" required />
          </div>

          {/* Buttons */}
          <div className="btns">
            <button type="submit">Next</button>
          </div>
        </form>

        {/* Contact Info */}
        <form onSubmit={handleNext}>
          {/* Email */}
          <label>
            Email<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.email ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="far fa-paper-plane"></i>
            <input style={{ paddingLeft: '8px' }} type="email" required />
          </div>

          {/* Phone Number */}
          <label>
            Phone Number<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.phoneNumber ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="fas fa-lock"></i>
            <input style={{ paddingLeft: '8px' }} type="number" required />
          </div>

          {/* Buttons */}
          <div className="btns">
            <button type="button" onClick={() => plusIndex(-1)}>
              Prev
            </button>
            <button type="submit">Next</button>
          </div>
        </form>

        {/* Date of Birth */}
        <form onSubmit={handleNext}>
          {/* Date */}
          <label>
            Date Of Birth<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.dateOfBirth ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i style={{ marginLeft: '-50px' }} className="fas fa-calendar-week"></i>

            {/* <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              minDate={new Date(1950, 0, 1)}
              maxDate={subYears(new Date(), 14)}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              yearDropdownItemNumber={125}
              scrollableYearDropdown
              placeholderText="Select a date"
              onChange={(date: Date) => {
                setStartDate(date);
                setValue('dateOfBirth', date, { shouldValidate: true });
              }}
            /> */}
          </div>

          {/* Gender */}
          <label>
            Gender<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.gender ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <select>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="btns">
            <button type="button" onClick={() => plusIndex(-1)}>
              Prev
            </button>
            <button type="submit">Next</button>
          </div>
        </form>

        {/* Submit */}
        <form>
          {/* User Name */}
          <label>
            User Name<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.username ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>
            <input style={{ paddingLeft: '8px' }} type="text" required />
          </div>

          {/* Password */}
          <label>
            Password<span>*</span>
          </label>
          <div
            // style={{
            //   marginBottom: errors.password ? '0px' : '20px',
            // }}
            className="login-input-group"
          >
            <i className="fas fa-lock"></i>
            <input style={{ paddingLeft: '8px' }} type="password" required />
          </div>

          {/* Buttons */}
          <div className="btns">
            <button type="button" onClick={() => plusIndex(-1)}>
              Prev
            </button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>

      <div className="intro-text">
        <span>Welcome to this site</span>
      </div>
    </div>
  );
};

export default UserRegisterForm;
