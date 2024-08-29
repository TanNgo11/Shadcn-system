type UserLogin = {
  username: string;
  password: string;
};

function LoginForm() {
  return (
    <div className="login">
      <strong>Sign in</strong>

      <form action="">
        {/* email */}
        <label htmlFor="">
          Email <span>*</span>{' '}
        </label>
        <div className="login-input-group">
          <i className="far fa-paper-plane"></i>
          <input type="text" required />
        </div>

        <label htmlFor="">
          Password <span>*</span>{' '}
        </label>
        <div className="login-input-group">
          <i className="fas fa-lock"></i>
          <input type="password" required />
        </div>

        <div className="btns">
          <button type="submit">Login</button>
        </div>
        <a href="#!" className="forget">
          Forget your password?
        </a>
      </form>

      <div className="intro-text">
        <span>Welcome to this site</span>
      </div>
    </div>
  );
}

export default LoginForm;
