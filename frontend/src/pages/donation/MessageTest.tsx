import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Money, Name, Test } from "./Message";

export const MessageTest = () => {
  const { t } = useTranslation();
  const [start, setStart] = useState(true);
  const [visible, setVisible] = useState(false);
  const sound = {
    donation: new Howl({
      src: [`${process.env.PUBLIC_URL}/sounds/alarm.mp3`],
    }),
  };
  useEffect(() => {
    if (start) {
      let context = new AudioContext();

      context.resume().then(() => sound.donation.play());

      setVisible(true);
      sound.donation.play();
      setTimeout(() => {
        setVisible(false);
      }, 3000);
      setTimeout(() => {
        sound.donation.stop();
        setStart(false);
      }, 5000);
    }
  }, [start]);

  return (
    <div>
      {start ? (
        <Test visible={visible}>
          <div>
            <Name>{t("SSAFY-6th")}</Name>
            {t("mrs")}
            <Money>66666</Money>
            {t("thank-you")}
          </div>
          <div> {t("message")}</div>
        </Test>
      ) : null}
      <BtnWrapper>
        <Btn onClick={() => setStart(false)}>{t("test-stop")}</Btn>
        <Btn onClick={() => setStart(true)}>{t("test-start")}</Btn>
      </BtnWrapper>
    </div>
  );
};
const BtnWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 43%;
  display: flex;
  height: 70px;
  align-items: center;
`;
const Btn = styled.div`
  color: ${(props) => props.theme.ownColor};
  border-radius: 3px;

  font-size: larger;
  padding: 7px;
  :hover {
    background-color: ${(props) => props.theme.ownColor};
    color: white;
    cursor: pointer;
  }
  transition-duration: 300ms;
`;
