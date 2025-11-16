const Notification = () => {
  return (
    <div className="apl-section">
      <div className="header">
        <h1>Notifications</h1>
      </div>

      <section className="notification">
        <form>
          <textarea
            name="notification"
            aria-required="true"
            aria-invalid="false"
          ></textarea>

          <span className="text-danger error"></span>

          <button className="btn btn-primary m-t-10 float-right disabled">
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default Notification;
