import React, { useEffect, useRef, useState } from "react";
import styles from "./ContactUs.module.scss";
import chevronTopImage from "../../img/chevron-top.png";
import instagramImage from "../../img/instagram.png";
import messengerImage from "../../img/messenger.png";
import telegramImage from "../../img/telegram.png";
import viberImage from "../../img/viber.png";
import whatsappImage from "../../img/whatsapp.png";
import mailImage from "../../img/mail-gray.png";
import { useNavigate } from "react-router-dom";
import { sendContact } from "../../http/index";
import Popup from "../../components/Popup/Popup";

const ContactUs = () => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.style.transition = "none";
    document.body.style.backgroundColor = "#161616";

    return () => {
      document.body.style.transition = "background-color 0.5s ease";
      document.body.style.backgroundColor = "unset";
    };
  }, []);

  let timeout = null;

  const copyToClipboard = (text, event) => {
    if (tooltip.show) return;
    navigator.clipboard.writeText(text);
    const { clientX, clientY } = event;
    setTooltip({ show: true, x: clientX, y: clientY });
    clearTimeout(timeout);
    timeout = setTimeout(
      () => setTooltip({ show: false, x: clientX, y: clientY }),
      2000
    );
  };

  const navigate = useNavigate();
  const page = useRef(null);

  const returnToMainPage = () => {
    page.current.classList.add(styles.disappear);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const [contactData, setContactData] = useState({
    name: "",
    contacts: "",
    message: "",
  });

  const [popupMessage, setPopupMessage] = useState({
    visible: false,
    text: "",
  });

  const sendForm = async () => {
    if (!contactData.name || !contactData.contacts) {
      setPopupMessage({
        visible: true,
        text: "Please, fill in your name and contact information",
      });
      return;
    }

    const responseData = await sendContact(contactData);
    if (responseData.message === "ERROR_TOO_MANY_REQUESTS") {
      setPopupMessage({
        visible: true,
        text: "Too many requests, please try again later",
      });
      return;
    }
    setContactData({ name: "", contacts: "", message: "" });
    setPopupMessage({ visible: true, text: "Thank you for your message!" });
  };

  return (
    <div className={styles.page} ref={page}>
      <Popup
        visible={popupMessage.visible}
        className={styles.modal}
        setVisible={() =>
          setPopupMessage({
            visible: false,
            text: "",
          })
        }
      >
        <h2>{popupMessage.text}</h2>
      </Popup>
      <button className={styles.back} onClick={() => returnToMainPage()}>
        <img src={chevronTopImage} alt="" />
        <p>Back to main page</p>
      </button>
      <div className={styles.content}>
        <h1>Let us create your site!</h1>
        <div className={styles.blocks}>
          <div className={styles.block}>
            <h2>Leave us your contact information!</h2>
            <div className={styles.form}>
              <div className={styles.inputBlock}>
                <p className={styles.desription}>Your name</p>
                <input
                  type="text"
                  placeholder="Bruce"
                  value={contactData.name}
                  onChange={(e) =>
                    setContactData({ ...contactData, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputBlock}>
                <p className={styles.desription}>How can we contact you?</p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Leave your email, any messenger username (specify messenger), etc.. so we can text you online"
                  value={contactData.contacts}
                  onChange={(e) =>
                    setContactData({ ...contactData, contacts: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputBlock}>
                <p className={styles.desription}>Any ideas, wishes, etc..</p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="I want to make a site for my candies shop. Can you make a bright colorful online-store with 3D models of lollypops? :D"
                  value={contactData.message}
                  onChange={(e) =>
                    setContactData({ ...contactData, message: e.target.value })
                  }
                />
              </div>
              <button onClick={sendForm}>Send</button>
            </div>
          </div>
          <p className={styles.or}>OR</p>
          <div className={styles.block}>
            <h2>Contact us in a way comfortable for you!</h2>
            <div className={styles.contacts}>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("@telegram", e)}
              >
                <img src={telegramImage} alt="" />
                <p>@telegram</p>
              </div>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("@messenger", e)}
              >
                <img src={messengerImage} alt="" />
                <p>@messenger</p>
              </div>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("email@domain.com", e)}
              >
                <img src={mailImage} alt="" />
                <p>email@domain.com</p>
              </div>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("@instagram", e)}
              >
                <img src={instagramImage} alt="" />
                <p>@instagram</p>
              </div>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("+8918239898", e)}
              >
                <img src={whatsappImage} alt="" />
                <p>+8918239898</p>
              </div>
              <div
                className={styles.contact}
                onClick={(e) => copyToClipboard("+8918239898", e)}
              >
                <img src={viberImage} alt="" />
                <p>+8918239898</p>
              </div>
            </div>
            <div
              className={styles.tooltip}
              style={{
                top: `${tooltip.y}px`,
                left: `${tooltip.x}px`,
                opacity: tooltip.show ? 1 : 0,
              }}
            >
              Copied!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
