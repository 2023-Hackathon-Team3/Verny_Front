import React, { useState } from "react";
import { http } from "../api/Http";
import { styled } from "styled-components";

import profileImg from "../assets/icons/profileImg3.svg";
import like from "../assets/icons/like.svg";
import likeClicked from "../assets/icons/likeClicked.svg";
import edit from "../assets/icons/edit.svg";
import del from "../assets/icons/delete.svg";

const ReComment = ({ commentId, comment, username, updateCommentList }) => {
  const [showMore, setShowMore] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeImgSrc, setLikeImgSrc] = useState(like);

  /* //더보기 버튼 상태 관리
  const handleShowMore = () => {
    setShowMore(true);
  }; */

  //댓글 좋아요 상태 관리
  const handleLike = async () => {
    try {
      const newLikeStatus = !likeStatus;
      setLikeStatus(newLikeStatus);
      await http.post(
        `/main/comments/${commentId}/recomments/${comment.id}/relikes`,
        {
          liked: newLikeStatus,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*  //답글 수정
  const editReComment = async () => {
    try {
      await http.put(`/main/comments/${commentId}/recomments/${comment.id}/`, {
        content: "수정 내용",
      });
    } catch (error) {
      console.log(error);
    }
  }; */

  //답글 삭제
  const delReComment = async () => {
    try {
      await http.delete(
        `/main/comments/${commentId}/recomments/${comment.id}/`
      );
      updateCommentList(comment.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Info>
        <Writer>
          <Profile src={profileImg} />
          <span id="name" alt="">
            {comment.author_username}
          </span>
          <span>·</span>
          <span id="time" alt="">
            {comment.created_at}
          </span>
        </Writer>
        <BtnBox>
          <Btn alt="댓글 좋아요 버튼" onClick={handleLike} liked={likeStatus}>
            <img src={likeImgSrc} />
            <span liked={likeStatus}>{comment.relikes_count}</span>
          </Btn>
          {username === comment.author_username && (
            <EditBox>
              {/*  <img id="edit" src={edit} onClick={editReComment}></img> */}
              <img id="del" src={del} onClick={delReComment}></img>
            </EditBox>
          )}
        </BtnBox>
      </Info>
      <Content showMore={showMore}>{comment.content}</Content>
      {/*       {!showMore && comment.content && comment.content.length > 100 && (
        <ShowMoreButton alt="더보기 버튼" onClick={handleShowMore}>
          더보기
        </ShowMoreButton>
      )} */}
    </Wrapper>
  );
};

export default ReComment;

const Wrapper = styled.div`
  width: 284px;
  display: flex;
  padding: 20px 32px 20px 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Content = styled.div`
  padding: 0px 12px;
  width: 272px;
  color: var(--n-neutral-10, #1a1c1e);
  /*   text-overflow: ${({ showMore }) =>
    showMore ? "initial" : "ellipsis"}; */
  font-family: Pretendard;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  white-space: pre-wrap;
  /* .truncate-content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  } */
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--n-neutral-10, #1a1c1e);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  span {
    padding-top: 4px;
  }
  #time {
    color: var(--p-primary-30, #004a77);
  }
`;

const Profile = styled.img`
  display: flex;
  width: 16px;
  height: 16px;
  padding: 6px;
  justify-content: center;
  align-items: center;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  #edit {
    margin-left: 6px;
    width: 11.5px;
    height: 11.5px;
  }
  #del {
    width: 27px;
    height: 27px;
  }
`;

const EditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  span {
    color: ${({ likeStatus }) =>
      likeStatus
        ? "var(--p-primary-40, #00639c)"
        : "var(--n-neutral-10, #1a1c1e)"};
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const ShowMoreButton = styled.div`
  color: var(--n-neutral-40, #5d5e61);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
