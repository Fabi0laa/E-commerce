function AdminFormWrapper({ children }) {
  return (
    <>
      <section className="tp-login-area pb-140 p-relative z-index-1 fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="tp-login-wrapper">
                <div className="tp-login-option">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminFormWrapper;
