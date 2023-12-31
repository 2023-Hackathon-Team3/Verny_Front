import React, { useState, useEffect } from "react";
import { VariableSizeList } from "react-window";
import PlaceData from "../database/PlaceData.json";
import styled from "styled-components";

const SearchedPlaceList = ({ searchText }) => {
  const [filteredData, setFilteredData] = useState([]); // 초기에 빈 배열로 설정

  useEffect(() => {
    // 검색어에 따라 데이터 필터링
    const filtered = PlaceData.filter(
      (place) =>
        place.name.toLowerCase().includes(searchText.toLowerCase()) ||
        place.address.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText]);

  // 스크롤 위치를 기억하는 상태 변수
  const [scrollOffset, setScrollOffset] = useState(0);

  // 가변 크기 리스트에서 아이템의 실제 높이를 반환하는 함수
  const getItemSize = (index) => {
    return 50; // 각 아이템의 높이
  };

  // 스크롤 시 추가 데이터 로드
  const handleScroll = ({ scrollOffset }) => {
    setScrollOffset(scrollOffset);

    if (scrollOffset > filteredData.length * 30 - 300) {
      // 스크롤이 끝에 가까워질 때 추가 데이터 로드
      const newData = PlaceData.slice(
        filteredData.length,
        filteredData.length + 20
      );
      setFilteredData((prevData) => [...prevData, ...newData]);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("복사 실패", error);
    }
  };

  const Row = ({ index, style }) => {
    const place = filteredData[index];
    return (
      <li
        style={{
          marginBottom: "2px",
          marginLeft: "28px",
          width: "300px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="name-category">
          <p
            style={{
              /*width: "86px",*/
              fontSize: "1rem",
              fontWeight: "400",
              lineHeight: "140%",
              color: "var(--n-neutral-10, #1A1C1E)",
              fontFamily: "Pretendard",
              fontStyle: "normal",
              textOverflow: "ellipsis", // 초과된 부분을 ...으로 표시
              overflow: "hidden",
            }}
          >
            {place.name}
          </p>
          <p
            style={{
              /*width: "70px",*/
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "140%",
              color: "var(--s-secondary-40, #52606F)",
              fontFamily: "Pretendard",
              fontStyle: "normal",
            }}
          >
            {place.category}
          </p>
        </div>
        <p
          style={{
            width: "130px",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "140%",
            color: "var(--n-neutral-40, #5D5E61)",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          {place.address}
        </p>
        <button
          onClick={() => handleCopy(place.address)}
          style={{
            width: "70px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            border: "none",
            borderRadius: "12px",
            background: "var(--p-primary-90, #CFE5FF)",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "140%",
            color: "var(--p-primary-10, #001D33)",
            fontFamily: "Pretendard",
            fontStyle: "normal",
            cursor: "pointer",
          }}
        >
          주소복사
        </button>
      </li>
    );
  };

  return (
    <PlaceListWrapper>
      <VariableSizeList
        width={360}
        height={300} // 리스트 높이
        itemCount={filteredData.length} // 보여질 아이템 개수
        itemSize={getItemSize} // 각 아이템의 높이를 반환하는 함수 사용
        onScroll={handleScroll}
        scrollToItem={scrollOffset}
        overscanCount={50}
      >
        {Row}
      </VariableSizeList>
    </PlaceListWrapper>
  );
};

const PlaceListWrapper = styled.div`
  width: 320px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 70px;

  /* .list-block {
      margin-left: 20px;
      width: 320px;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    } */

  .name-category {
    width: 120px;
  }
`;

export default SearchedPlaceList;
