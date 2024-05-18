import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./ProfilePage.styled";
import Typography from "@/app/components/Typography/Typography";
import { useState } from "react";
import Button from "@/app/components/Button/Button";
import PreferencesSection from "./sections/PreferencesSection/PreferencesSection";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<
    "ulubione" | "preferencje" | "zapisane" | "powiadomienia" | "dane-osobowe"
  >("ulubione");
  return (
    <S.Wrapper>
      <Navigation />
      <S.Container>
        <S.NavigationPanel>
          <S.Menu>
            <S.NavigationPanelItem
              active={activeSection === "ulubione"}
              onClick={() => setActiveSection("ulubione")}
            >
              <Typography tag="p">Ulubione</Typography>
            </S.NavigationPanelItem>
            <S.NavigationPanelItem
              active={activeSection === "preferencje"}
              onClick={() => setActiveSection("preferencje")}
            >
              <Typography tag="p">Preferencje</Typography>
            </S.NavigationPanelItem>
            <S.NavigationPanelItem
              active={activeSection === "zapisane"}
              onClick={() => setActiveSection("zapisane")}
            >
              <Typography tag="p">Zapisane</Typography>
            </S.NavigationPanelItem>
            <S.NavigationPanelItem
              active={activeSection === "powiadomienia"}
              onClick={() => setActiveSection("powiadomienia")}
            >
              <Typography tag="p">Powiadomienia</Typography>
            </S.NavigationPanelItem>
            <S.NavigationPanelItem
              active={activeSection === "dane-osobowe"}
              onClick={() => setActiveSection("dane-osobowe")}
            >
              <Typography tag="p">Dane osobowe</Typography>
            </S.NavigationPanelItem>
          </S.Menu>
          <S.NavigationPanelItem active={false}>
            <Typography tag="p">Wyloguj</Typography>
          </S.NavigationPanelItem>
        </S.NavigationPanel>

        {activeSection === "dane-osobowe" && (
          <S.Form>
            <S.Input placeholder="Imię" />
            <S.Input placeholder="Email" />
            <S.Input placeholder="Numer telefonu" />

            <Button>Zapisz zmiany</Button>
          </S.Form>
        )}
        {activeSection === "preferencje" && <PreferencesSection />}
      </S.Container>
    </S.Wrapper>
  );
};

export default ProfilePage;
