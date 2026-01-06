import "./ThankYou.css";

export default function ThankYou() {
  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <h2>Thank You for Voting</h2>

        <p>
          Your vote has been successfully recorded.
        </p>

        <p className="note">
          Democracy thrives because of responsible citizens like you.
        </p>
      </div>
    </div>
  );
}
