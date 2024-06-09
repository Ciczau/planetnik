import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./ProfilePage.styled";
import Typography from "@/app/components/Typography/Typography";
import { useState } from "react";
import Button from "@/app/components/Button/Button";
import PreferencesSection from "./sections/PreferencesSection/PreferencesSection";
import { useForm } from "react-hook-form";
import { TUser } from "@/app/types/user";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<
    "ulubione" | "preferencje" | "zapisane" | "powiadomienia" | "dane-osobowe"
  >("preferencje");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
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
              {/* TODO: Create this section */}
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
              {/* TODO: Create this section */}
              <Typography tag="p">Zapisane</Typography>
            </S.NavigationPanelItem>
            <S.NavigationPanelItem
              active={activeSection === "powiadomienia"}
              onClick={() => setActiveSection("powiadomienia")}
            >
              {/* TODO: Create this section */}
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
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.Input placeholder="Imię" {...register("name")} />
            <S.Input
              placeholder="Numer telefonu"
              error={!!errors.phone}
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Niepoprawny numer telefonu",
                },
              })}
            />
            {errors.phone && (
              <S.ErrorMessage>{errors.phone.message as string}</S.ErrorMessage>
            )}

            <Button>Zapisz zmiany</Button>
          </S.Form>
        )}
        {activeSection === "preferencje" && <PreferencesSection />}
      </S.Container>
    </S.Wrapper>
  );
};

export default ProfilePage;
