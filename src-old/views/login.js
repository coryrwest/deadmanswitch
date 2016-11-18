export default () => (
  <div>
    <h2>Login</h2>
    <p>Please enter your email address. This will act as your login, so do not forget what email you used.</p>
    <p>We will send a login link to this email address whenever you want to login. You will have to click the link in the email in order to login.</p>
    <form>
      <label className="textfield">
        <input type="text" id="email" />
        <span className="textfield__label">Your Email</span>
      </label>
      <input type="submit">Send login link</input>
    </form>
  </div>
)
