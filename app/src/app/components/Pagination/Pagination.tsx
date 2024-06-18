import * as S from "./Pagination.styled";

const Pagination = () => {
  return (
    <S.PaginationContainer>
      <S.PageButton>
        <S.PrevButton />
      </S.PageButton>
      <S.PageButton active>1</S.PageButton>
      <S.PageButton>
        <S.NextButton />
      </S.PageButton>
    </S.PaginationContainer>
  );
};

export default Pagination;
