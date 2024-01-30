import React, { useState, useEffect } from "react";
import style from "./MainPage.module.css";
import banner from "../../assets/Banner.png";
import Lock from "../../assets/Vector.png";
import Plus from "../../assets/+.png";
import Modal from "../CreateGroup/CreateGroup"
import Notes from "../CreateNotes/Notes"

export default function MainPage() {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
      fetchGroup();
    };
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };
  console.log(groups);
  return (
    <>
      <div className={style.container}>
        <div className={style.leftSide} style={{ position: "relative" }}>
          <h2>Pocket Notes</h2>
          <button style={{ position: "fixed", width: "50px" }}
            onClick={() => setOpenModal(true)}
          >
            <img src={Plus} alt="" />
          </button>
          <div className={style.GroupList}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`${style.groupItem} ${
                    groupSelect === group ? 'selected' : ''
                  }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className={style.groupIcon}
                    style={{ background: group.color }}
                  >
                    {group.groupName?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <h2 className={style.groupName}>{group.groupName}</h2>
                </div>
              ))}
            </div>
        </div>
        {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
        <div className="MessageAreaContainer">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <>
                <div className="MessageAreaText">
                  <img src={banner} alt="banner"></img>
                  <h2 className="MessageAreaHeading">PocketNotes</h2>
                  <p className="MessageAreaDescription">
                    Send and receive messages without keeping your phone online.
                    <br /> Use Pocket Notes on up to 4 linked devices and 1
                    mobile phone
                  </p>
                </div>
                <footer className="MessageAreaFooter">
                  <img src={Lock} alt="lock"></img>
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </div>
    </>
  );
};
