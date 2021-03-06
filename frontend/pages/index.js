// external modules
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import Head from 'next/head';

// internal modules
import Nav from '../components/Nav';
import Category from '../components/Category';
import MobileCategory from '../components/Category/MobileCategory';
import VideoList from '../components/VideoList';
import SelectedVideo from '../components/SelectedVideo';
import { CATEGORY, SELECTED_VIDEO_LIST, RECOMMEND } from '../config';

export async function getStaticProps() {
  const categoryRes = await fetch(CATEGORY);
  const recommendRes = await fetch(RECOMMEND);
  const categoryList = await categoryRes.json();
  const recommendList = await recommendRes.json();
  return {
    props: { categoryList, recommendList },
  };
}

export default function HomePage(props) {
  // 카테고리 저장
  const categoryfromAPI = props.pageProps.categoryList;
  const contentList = categoryfromAPI.content_types;
  const stackList = categoryfromAPI.stacks;
  const creatorList = categoryfromAPI.channels;
  // 선택된 태그 이름 및 ID
  const [selectedContent, setSelectedContent] = useState([]);
  const [contentId, setContentId] = useState([]);
  const [selectedStack, setSelectedStack] = useState([]);
  const [stackId, setStackId] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState([]);
  const [creatorId, setCreatorId] = useState([]);
  // 선택한 태그에 대한 list
  const [returnList, setReturnList] = useState([]);
  // 카테고리 검은 화면
  const [black, setBlack] = useState(false);

  // 선택한 태그 API 가져오기
  useEffect(() => {
    let returnUrl = '';
    const splitContentId = contentId.join('&');
    const splitStackId = stackId.join('&');
    const splitCreatorId = creatorId.join('&');

    if (splitContentId) {
      returnUrl = splitContentId;
    } else if (!splitContentId) {
      if (splitStackId && splitCreatorId) {
        returnUrl = `${splitStackId}&${splitCreatorId}`;
      } else if (splitStackId) {
        returnUrl = splitStackId;
      } else if (splitCreatorId) {
        returnUrl = splitCreatorId;
      }
    }

    axios
      .get(`${SELECTED_VIDEO_LIST}?${returnUrl}`)
      .then((res) => setReturnList(res.data.videos));

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, [contentId, stackId, creatorId]);

  // 컨텐츠 태그 추가/제거
  const addDelContentTags = (name, id) => {
    if (selectedStack[0] || selectedCreator[0]) {
      // stack이나 creator 태그가 있다면 지우고, content 태그로 대체
      setSelectedStack([]);
      setSelectedCreator([]);
      setSelectedContent([name]);
      setStackId([]);
      setContentId([`contents_types_id=${id}`]);
    } else if (selectedContent.includes(name)) {
      setSelectedContent(selectedContent.filter((names) => names !== name));
      setContentId(
        contentId.filter((ids) => ids !== `contents_types_id=${id}`),
      );
      setContentId([]);
    } else {
      setSelectedContent([name]);
      setContentId([`contents_types_id=${id}`]);
    }
  };

  // 스택 태그 추가/제거
  const addDelStackTags = (name, id) => {
    if (selectedContent[0]) {
      // content나 creator가 선택되었다면 content, creator는 없애고, stack 태그 추가
      setSelectedContent([]);
      setSelectedStack([name]);
      setContentId([]);
      setStackId([`stack_id=${id}`]);
    } else if (selectedCreator.length > 1) {
      // creator가 2개 이상이라면, creator 모두 지우기
      setSelectedCreator([selectedCreator[0]]);
      setCreatorId([creatorId[0]]);
      setSelectedStack([name]);
      setStackId([`stack_id=${id}`]);
    } else if (selectedStack.includes(name)) {
      setSelectedStack(selectedStack.filter((names) => names !== name));
      setStackId(stackId.filter((ids) => ids !== `stack_id=${id}`));
    } else if (selectedStack.length > 2) {
      // 최대 3개만 가능
      setSelectedStack([name, ...selectedStack].slice(0, 3));
      setStackId([`stack_id=${id}`, ...stackId].slice(0, 3));
    } else {
      setSelectedStack([name, ...selectedStack]);
      setStackId([`stack_id=${id}`, ...stackId]);
    }
  };

  // 크리에이터 태그 추가/제거
  const addDelCreatorTags = (tag, id) => {
    if (selectedContent[0]) {
      // content가 선택되었다면 content는 없애고, creator 태그 추가
      setSelectedContent([]);
      setSelectedCreator([tag]);
      setContentId([]);
      setCreatorId([`channels_id=${id}`]);
    } else if (selectedStack.length > 0) {
      // stack이 있을 경우 하나의 크리에이더만 선택 가능
      setSelectedCreator([tag]);
      setCreatorId([`channels_id=${id}`]);
      // stack이 있으면서 선택한 creator를 없애고 싶은 경우
      if (selectedCreator.includes(tag)) {
        setSelectedCreator(selectedCreator.filter((tags) => tags !== tag));
        setCreatorId(creatorId.filter((ids) => ids !== `channels_id=${id}`));
      }
    } else {
      // stack이 없을 경우 모든 크리에이터 선택 가능
      setSelectedCreator([tag, ...selectedCreator]);
      setCreatorId([`channels_id=${id}`, ...creatorId]);
      if (selectedCreator.includes(tag)) {
        setSelectedCreator(selectedCreator.filter((tags) => tags !== tag));
        setCreatorId(creatorId.filter((ids) => ids !== `channels_id=${id}`));
      }
    }
  };

  // 선택된 태그 전체지우기
  const removeTags = () => {
    setSelectedContent([]);
    setSelectedStack([]);
    setSelectedCreator([]);
    setContentId([]);
    setStackId([]);
    setCreatorId([]);
    setReturnList([]);
  };

  // 맨 위로 가기
  const goToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  // 카테고리 검정
  const onBlackScreen = () => {
    if (black) {
      setBlack(false);
    } else {
      setBlack(true);
    }
  };

  const tabletRef = useRef(null);
  const outsideCategory = () => {
    useEffect(() => {
      const outside = (e) => {
        if (tabletRef.current && !tabletRef.current.contains(e.target)) {
          setBlack(false);
        }
      };

      document.addEventListener('mousedown', outside);
      return () => {
        document.removeEventListener('mousedown', outside);
      };
    }, [tabletRef]);
  };
  outsideCategory(tabletRef);

  return (
    <>
      <Head>
        <title>BFRun</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BlackWrap isBlack={black}>
        <Nav removeTags={removeTags} />
        <ContentWrap isBlack={black}>
          <ContentContainer>
            <Category
              contentList={contentList}
              selectedContent={selectedContent}
              addDelContentTags={addDelContentTags}
              stackList={stackList}
              selectedStack={selectedStack}
              addDelStackTags={addDelStackTags}
              creatorList={creatorList}
              selectedCreator={selectedCreator}
              addDelCreatorTags={addDelCreatorTags}
            />
            {selectedContent[0] || selectedStack[0] || selectedCreator[0] ? (
              <SelectedVideo
                returnList={returnList}
                selectedContent={selectedContent}
                addDelContentTags={addDelContentTags}
                selectedStack={selectedStack}
                addDelStackTags={addDelStackTags}
                selectedCreator={selectedCreator}
                addDelCreatorTags={addDelCreatorTags}
                removeTags={removeTags}
              />
            ) : (
              <VideoList recommendList={props.pageProps.recommendList} />
            )}
            <GoUp onClick={goToTop}>
              <i className="fa fa-arrow-up" />
            </GoUp>
          </ContentContainer>
        </ContentWrap>
      </BlackWrap>
      {/* Tablet 이하 카테고리 */}
      <TabletScreen ref={tabletRef}>
        <MobileCategory
          contentList={contentList}
          selectedContent={selectedContent}
          addDelContentTags={addDelContentTags}
          stackList={stackList}
          selectedStack={selectedStack}
          addDelStackTags={addDelStackTags}
          creatorList={creatorList}
          selectedCreator={selectedCreator}
          addDelCreatorTags={addDelCreatorTags}
          onBlackScreen={onBlackScreen}
        />
      </TabletScreen>
    </>
  );
}

const ContentWrap = styled.section`
  position: relative;
  top: 100px;
  padding: 30px 0;
  background-color: #f9f9f9;
  height: 100%;

  ${(props) =>
    props.isBlack &&
    css`
      cursor: default;
      pointer-events: none;
    `}
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;

  @media ${(props) => props.theme.laptopM} {
    max-width: 100%;
  }
`;

const BlackWrap = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.isBlack &&
    css`
      z-index: 500;
      opacity: 0.3;
      -webkit-filter: blur(3px);
    `}
`;

const GoUp = styled.div`
  position: absolute;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 20px;
  height: 40px;
  width: 40px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  line-height: 35px;
`;

const TabletScreen = styled.div`
  display: none;
  @media ${(props) => props.theme.laptopM} {
    display: block;
  }
`;
