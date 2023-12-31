import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { http } from "../api/Http";

import TopBar from "../components/TopBar";
import search from "../assets/icons/search.svg";
import delBtn from "../assets/icons/deleteSecondary.svg";
import ArtBox from "../components/ArtBox";
import MenuBar from "../components/MenuBar";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.state?.keyword || "";

  //미술품 카테고리
  const categories = ["전체", "고전미술", "현대미술"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [text, setText] = useState(keyword);
  const [searchResult, setSearchResult] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredArts =
    selectedCategory === "전체"
      ? searchResult
      : searchResult.filter((art) => art.type === selectedCategory);

  //검색 함수
  const goSearch = async (text) => {
    try {
      const response = await http.get(`/main/search/?q=${text}`);
      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const deleteText = () => {
    setText("");
    navigate("/art");
  };

  console.log(text);

  //리렌더링
  useEffect(() => {
    goSearch(keyword);
  }, []);

  return (
    <Wrapper>
      <TopBar />
      <SearchBar>
        <form className="input-container" onSubmit={goSearch}>
          <InputContainer>
            <Input
              type="text"
              placeholder="제목이나 작가를 검색해보세요!"
              onChange={onChange}
              value={text}
            />
            {text && (
              <DeleteBtn onClick={deleteText}>
                <img src={delBtn} alt="검색어 삭제 버튼" />
              </DeleteBtn>
            )}
          </InputContainer>
          <SubmitButton>
            <img src={search} alt="검색 버튼" />
          </SubmitButton>
        </form>
      </SearchBar>
      <CategoryBar>
        {categories.map((category, index) => (
          <Category
            key={index}
            id={category}
            isSelected={category === selectedCategory}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Category>
        ))}
      </CategoryBar>
      <ArtCnt>작품 {filteredArts.length}개를 감상해보세요!</ArtCnt>
      <ArtList>
        {filteredArts.length ? (
          filteredArts.map((art) => <ArtBox key={art.id} art={art} />)
        ) : (
          <p>
            검색 결과가 없어요. <br /> 다시 시도해주시겠어요?
          </p>
        )}
      </ArtList>
      <Link to="/art/upload" style={{ textDecoration: "none" }}></Link>
      <MenuBar />
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 360px;
  height: 800px;
  background: var(--n-neutral-100, #fff);
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 328px;
  padding: 8px 16px;
  gap: 8px;
  background: var(--n-neutral-100, #fff);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 242px;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 12px;
  border: 1.5px solid var(--s-secondary-80, #b9c8da);
  background: var(--s-secondary-99, #fcfcff);
  outline: none;
  color: var(--s-secondary-10, #0e1d2a);
  font-family: Pretendard;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const DeleteBtn = styled.div`
  margin-left: -40px;
  display: flex;
  width: 16px;
  height: 16px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  padding: 0;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const CategoryBar = styled.div`
  display: flex;
  width: 328px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: var(--n-neutral-100, #fff);
`;

const Category = styled.div`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  color: ${(props) =>
    props.isSelected
      ? "var(--t-teritary-40, #745470)"
      : "var(--p-primary-10, #001d33)"};

  text-align: center;
  font-family: Pretendard;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--t-teritary-40, #745470);" : "none"};
`;

const ArtCnt = styled.div`
  display: flex;
  width: 312px;
  height: 48px;
  height: 44px;
  padding: 0px 24px;
  align-items: center;
  flex-shrink: 0;
  background: var(--n-neutral-100, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 51, 84, 0.04);
  color: var(--s-secondary-40, #52606f);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ArtList = styled.div`
  margin: 0px 16px;
  padding-top: 20px;
  padding-bottom: 30px;
  height: 430px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    position: absolute;
    top: 430px;
    left: 110px;
    color: var(--s-secondary-50, #6a7889);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;
