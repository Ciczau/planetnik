import Navigation from "@/app/components/Navigation/Navigation";
import * as S from "./ProfilePage.styled";
import Typography from "@/app/components/Typography/Typography";
import { useState } from "react";
import Button from "@/app/components/Button/Button";
import PreferencesSection from "./sections/PreferencesSection/PreferencesSection";
import { useForm } from "react-hook-form";
import { TUser } from "@/app/types/user";
import { useSavedActivitiesContext } from "@/app/context/activities/saved";
import Activity from "@/app/components/Activity/Activity";
import { useFavouritesContext } from "@/app/context/activities/favourities";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<
    "ulubione" | "preferencje" | "zapisane" | "powiadomienia" | "dane-osobowe"
  >("ulubione");

  const { saved } = useSavedActivitiesContext();
  const { favourites } = useFavouritesContext();
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
          <S.FormWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <S.ErrorMessage>
                  {errors.phone.message as string}
                </S.ErrorMessage>
              )}

              <Button>Zapisz zmiany</Button>
            </S.Form>
          </S.FormWrapper>
        )}

        {activeSection === "preferencje" && <PreferencesSection />}
        {activeSection === "zapisane" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <Typography tag="h3">Zapisane zdarzenia:</Typography>
            {saved?.map((activity) => (
              <Activity
                activity={activity}
                key={`${activity.city}-${activity.date}`}
              />
            ))}
          </div>
        )}
        {activeSection === "ulubione" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <Typography tag="h3">Ulubione aktywności:</Typography>
            {favourites?.map((activity) => (
              <div
                key={`${activity.name}`}
                style={{
                  padding: "15px 25px",
                  boxShadow: "0px 0px 5px 3px #0000002d",
                }}
              >
                <Typography tag="h4">{activity.name}</Typography>
              </div>
            ))}
          </div>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default ProfilePage;
