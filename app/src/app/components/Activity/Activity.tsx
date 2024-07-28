import { IActivity } from "@/app/types/activity";
import * as S from "./Activity.styled";
import { formatDate } from "@/app/utils/date";
import Typography from "../Typography/Typography";
import { Exo, Lilita_One, Saira_Condensed, Signika } from "next/font/google";
import { useFavouritesContext } from "@/app/context/activities/favourities";
import { useSavedActivitiesContext } from "@/app/context/activities/saved";
import {
  addFavouriteRequest,
  removeFavouriteRequest,
  removeSavedActivityRequest,
  saveActivityRequest,
} from "@/app/api/activityRequests";
import { useUserContext } from "@/app/context/user";

type Props = {
  activity: IActivity;
};

const font = Exo({ weight: "400", subsets: ["latin"] });

const Activity = ({ activity }: Props) => {
  const { favourites, setFavourites } = useFavouritesContext();
  const { saved, setSaved } = useSavedActivitiesContext();
  const user = useUserContext();

  const handleFavourite = async (isFavourite: boolean) => {
    if (!user) return;
    if (isFavourite) {
      const res = await addFavouriteRequest(user?._id, activity.type.name);
      if (res.success) {
        setFavourites([...favourites, { name: activity.type.name }]);
      }
    } else {
      const res = await removeFavouriteRequest(user?._id, activity.type.name);
      if (res.success) {
        setFavourites(favourites.filter((x) => x.name !== activity.type.name));
      }
    }
  };

  const handleSave = async (isSaved: boolean) => {
    if (!user) return;
    if (isSaved) {
      const res = await saveActivityRequest(user?._id, activity);
      if (res.success) {
        setSaved([...saved, activity]);
      }
    } else {
      const res = await removeSavedActivityRequest(user?._id, activity);

      if (res.success) {
        setSaved(
          saved?.filter(
            (el) =>
              !(
                el.city === activity.city &&
                el.date === activity.date &&
                el.type.name === activity.type.name
              )
          )
        );
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Image
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTckaWUNxPCqtor_jMB_Gpbe1pVT-fW73DOyahcA5k-2w&s"
        }
        alt={activity.type.name}
      />
      <S.Content>
        <div>
          <Typography tag="h3">{activity.type.name}</Typography>
          <S.City>{activity.city}</S.City>
        </div>
        <S.Date className={font.className}>{formatDate(activity.date)}</S.Date>
      </S.Content>
      <S.Actions>
        {favourites?.map((x) => x.name).includes(activity.type.name) ? (
          <S.HeartFilledIcon onClick={() => handleFavourite(false)} />
        ) : (
          <S.HeartEmptyIcon onClick={() => handleFavourite(true)} />
        )}
        {saved?.filter(
          (el) =>
            el.city === activity.city &&
            el.date === activity.date &&
            el.type.name === activity.type.name
        ).length > 0 ? (
          <S.SaveFilledIcon onClick={() => handleSave(false)} />
        ) : (
          <S.SaveEmptyIcon onClick={() => handleSave(true)} />
        )}
      </S.Actions>
    </S.Wrapper>
  );
};

export default Activity;
