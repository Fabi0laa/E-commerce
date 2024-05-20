import React from 'react';

function SingleNav({ active = false, id, title, icon, setActiveTab }) {
  return (
    <button
      className={`nav-link ${active ? 'active' : ''}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? 'true' : 'false'}
      onClick={() => setActiveTab(id)}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

const ProfileNavTab = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <div className="nav nav-tabs tp-tab-menu flex-column" id="profile-tab" role="tablist">
        <SingleNav
          setActiveTab={setActiveTab}
          active={activeTab === 'profile'}
          id="profile"
          title="Profile"
          icon="fa-regular fa-user-pen"
        />
        <SingleNav
          active={activeTab === 'information'}
          id="information"
          title="Information"
          icon="fa-regular fa-circle-info"
          setActiveTab={setActiveTab}
        />
        <SingleNav
          setActiveTab={setActiveTab}
          active={activeTab === 'order'}
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />
      </div>
    </nav>
  );
};

export default ProfileNavTab;
