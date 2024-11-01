import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Select, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  formatToStudentPayload,
  genderOptions,
  studentRegisterFormSchema,
  studentRegisterInitialState,
  StudentResisterForm,
} from './helpers';
import './styles.scss';

import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useCreateNewStudent } from '@/queries/Students/useCreateNewStudent';
type RegisterFormProps = {
  switchToLogin: () => void;
};

const UserRegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const toast = useNotification();
  const [currIndex, setCurrIndex] = useState<number>(0);
  const { onCreateStudent } = useCreateNewStudent({
    onSuccess: () => {
      toast.success({
        message: 'Register Successfully',
        description: 'You can login now!',
      });
      reset();
      switchToLogin();
    },
    onError: (error) => {
      toast.error({
        message: 'Register Failed',
        description: error.message,
      });
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<StudentResisterForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: studentRegisterInitialState,
    resolver: zodResolver(studentRegisterFormSchema),
  });

  const plusIndex = (n: number) => {
    setCurrIndex((prev) => prev + n);
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    plusIndex(1);
  };

  const onSubmit = (data: StudentResisterForm) => {
    if (!isDirty) {
      toast.info({
        message: 'Please fill in all required fields',
      });
    }
    const studentPayload = formatToStudentPayload(data);

    onCreateStudent(studentPayload);
  };

  return (
    <div className="register register-container">
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
            style={{
              marginBottom: errors.firstName ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="text"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.firstName && (
            <Typography.Text type="danger">{errors.firstName.message}</Typography.Text>
          )}
          {/* Last Name */}
          <label>
            Last Name<span>*</span>
          </label>
          <div
            style={{
              marginBottom: errors.lastName ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="text"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.lastName && (
            <Typography.Text type="danger">{errors.lastName.message}</Typography.Text>
          )}

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
            style={{
              marginBottom: errors.email ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="far fa-paper-plane"></i>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="text"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.email && <Typography.Text type="danger">{errors.email.message}</Typography.Text>}

          {/* Phone Number */}
          <label>
            Phone Number<span>*</span>
          </label>
          <div
            style={{
              marginBottom: errors.phone ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-lock"></i>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="number"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.phone && <Typography.Text type="danger">{errors.phone.message}</Typography.Text>}

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
            style={{
              marginBottom: errors.dateOfBirth ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-calendar-week"></i>

            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  style={{ width: '100%', border: 'none' }}
                  onChange={(_date, dateString) => onChange(dateString)}
                />
              )}
            />
          </div>
          {errors.dateOfBirth && (
            <Typography.Text type="danger">{errors.dateOfBirth.message}</Typography.Text>
          )}

          {/* Gender */}
          <label>
            Gender<span>*</span>
          </label>
          <div
            style={{
              marginBottom: errors.gender ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  style={{ width: '100%' }}
                  className="register-container__select-field"
                  options={genderOptions}
                />
              )}
            />
          </div>
          {errors.gender && (
            <Typography.Text type="danger">{errors.gender.message}</Typography.Text>
          )}

          {/* Buttons */}
          <div className="btns">
            <button type="button" onClick={() => plusIndex(-1)}>
              Prev
            </button>
            <button type="submit">Next</button>
          </div>
        </form>

        {/* Submit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* User Name */}
          <label>
            User Name<span>*</span>
          </label>
          <div
            style={{
              marginBottom: errors.username ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-user"></i>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="text"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.username && (
            <Typography.Text type="danger">{errors.username.message}</Typography.Text>
          )}

          {/* Password */}
          <label>
            Password<span>*</span>
          </label>
          <div
            style={{
              marginBottom: errors.password ? '0px' : '20px',
            }}
            className="login-input-group"
          >
            <i className="fas fa-lock"></i>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  style={{ marginLeft: '8px' }}
                  type="password"
                  required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          {errors.password && (
            <Typography.Text type="danger">{errors.password.message}</Typography.Text>
          )}

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
