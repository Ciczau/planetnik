import { IActivity } from "@/app/types/activity";
import * as S from "./Activity.styled";
import { formatDate } from "@/app/utils/date";
import Typography from "../Typography/Typography";
import { Exo, Lilita_One, Saira_Condensed, Signika } from "next/font/google";

type Props = {
  activity: IActivity;
};

const font = Exo({ weight: "400", subsets: ["latin"] });

const Activity = ({ activity }: Props) => {
  return (
    <S.Wrapper>
      <S.Image
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTckaWUNxPCqtor_jMB_Gpbe1pVT-fW73DOyahcA5k-2w&s"
        }
        alt={activity.activity}
      />
      <S.Content>
        <div>
          <Typography tag="h3">{activity.activity}</Typography>
          <S.City>{activity.city}</S.City>
        </div>
        <S.Date className={font.className}>{formatDate(activity.date)}</S.Date>
      </S.Content>
    </S.Wrapper>
  );
};

export default Activity;
