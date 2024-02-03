import React, { useEffect } from "react";
import styles from "./ContactUs.module.scss";
import chevronTopImage from "../../img/chevron-top.png";
import instagramImage from "../../img/instagram.png";
import messengerImage from "../../img/messenger.png";
import telegramImage from "../../img/telegram.png";
import viberImage from "../../img/viber.png";
import whatsappImage from "../../img/whatsapp.png";
import mailImage from "../../img/mail-gray.png";
import { Link } from "react-router-dom";

const ContactUs = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#161616";
  }, []);

  return (
    <div className={styles.page}>
      <Link to={"/"}>
        <button className={styles.back}>
          <img src={chevronTopImage} alt="" />
          <p>Back to main page</p>
        </button>
      </Link>
      <div className={styles.content}>
        <h1>Let us create your site!</h1>
        <div className={styles.blocks}>
          <div className={styles.block}>
            <h2>Leave us your contact information!</h2>
            <div className={styles.form}>
              <div className={styles.inputBlock}>
                <p className={styles.desription}>Your name</p>
                <input type="text" placeholder="Bruce" />
              </div>
              <div className={styles.inputBlock}>
                <p className={styles.desription}>How can we contact you?</p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Leave your email, any messenger username (specify messenger), etc.. so we can text you online"
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
                />
              </div>
              <button>Send</button>
            </div>
          </div>
          <p className={styles.or}>OR</p>
          <div className={styles.block}>
            <h2>Contact us in a way comfortable for you!</h2>
            <div className={styles.contacts}>
              <div className={styles.contact}>
                <img src={telegramImage} alt="" />
                <p>@telegram</p>
              </div>
              <div className={styles.contact}>
                <img src={messengerImage} alt="" />
                <p>@messenger</p>
              </div>
              <div className={styles.contact}>
                <img src={mailImage} alt="" />
                <p>email@domain.com</p>
              </div>
              <div className={styles.contact}>
                <img src={instagramImage} alt="" />
                <p>@instagram</p>
              </div>
              <div className={styles.contact}>
                <img src={whatsappImage} alt="" />
                <p>+8918239898</p>
              </div>
              <div className={styles.contact}>
                <img src={viberImage} alt="" />
                <p>+8918239898</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
