import React from "react";

const Tab = ({ currentTab, setCurrentTab, options, tabContent }) => {
  return (
    <ul className="nav">
      {options.map((option) => {
        return (
          <li
            onClick={() => setCurrentTab(option.name)}
            className={
              "nav-item " + (currentTab === option.name ? "current" : "")
            }
          >
            {option.icon ? (
              <i className="icon" className={"bi bi-" + option.icon}></i>
            ) : option.img ? (
              <img className="icon" src={option.img} />
            ) : (
              option.name
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Tab;
