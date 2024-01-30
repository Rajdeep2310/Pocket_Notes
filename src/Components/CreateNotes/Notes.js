import React,{useState,useEffect} from "react"
import styles from "./Notes.module.css"
import sendIcon from "../../assets/send.png";
// import back from "../assets/back.png";


export default function CreateNotes(props) {
    const [note, setNote] = useState('');

  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

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
    window.addEventListener('resize', Screen);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];

    let Cgroup = newGroup[groupSelect.id];

    let time = `${new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;

    Cgroup['notes'].push({ date, time, note });
    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
      setNote('');
    }
  };
    return (
        <>
            <div className={styles.notesContainer}>
              <div className={styles.notesHeader}>
                <div
                  className={styles.notesGroup}
                  style={{ background: groupSelect.color }}
                >
                  {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
                </div>
                <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
              </div>
              <div className={styles.NotesAndDate}>
                {notes.map((note) => (
                  <div className={styles.DateAndText}>
                    <div className={styles.DateAndTime}>
                      <p className={styles.Time}>{note.time}</p>
                      <p className={styles.Date}>{note.date}</p>
                    </div>
                    <p className={styles.Text}>{note.note}</p>
                  </div>
                ))}
              </div>
              <div className={styles.Textarea}>
                <textarea
                  className={styles.TextInput}
                  type="text"
                  value={note}
                  onChange={handleChange}
                  placeholder="Enter your text here..."
                  onKeyDown={keypress}
                ></textarea>
                <img
                  src={sendIcon}
                  className={styles.SendImg}
                  alt="SendImg"
                  onClick={handleSubmit}
                />
              </div>
            </div>
        </>
    );
};
