// external modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

// internal modules
import DetailList from './List';

const DetailContent = () => {
  const [data, setData] = useState();
  // 조회수의 숫자에 쉼표를 찍는 Intl 함수를 변수로 지정하여 조회수에 쓰이고 있습니다.
  const numberFilter = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3,
  });

  // 영상의 정보들을 이 곳에서 패치하여 data에 저장합니다.
  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/52ed43fb-0d74-437d-a71c-b9e59d436a09')
      .then((response) => {
        // eslint-disable-next-line no-console
        setData(response.data);
        // console.log('axios >>>', response.data);
      });
  }, []);

  return (
    <DetailContentWrap>
      <DetailContentContainer>
        {data && (
          <>
            <section>
              <figure>
                <img src={data.profile} alt="" />
                <figcaption>{data.channel}</figcaption>
              </figure>
            </section>
            <section>
              <summary>{data.title}</summary>
              <articel>
                조회수 {numberFilter.format(data.views)}회{' '}
                <time>{data.created_at}</time>
              </articel>
              <main>{data.descriptions}</main>
            </section>
          </>
        )}
      </DetailContentContainer>
    </DetailContentWrap>
  );
};

export default DetailContent;

const DetailContentWrap = styled.div`
  /* position: absolute;
  top: calc(68vh + 80px); */
  margin-top: 20px;
  width: 960px;
  /* height: 15vh; */
  @media ${(props) => props.theme.laptopM} {
    display: flex;
    justify-content: space-between;
    width: 95vw;
  }
  @media ${(props) => props.theme.tablet} {
    display: unset;
    width: 95vw;
  }
`;

const ListSection = styled.section`
  display: none;
  @media ${(props) => props.theme.laptopM} {
    display: unset;
  }
`;

const DetailContentContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  font-size: 13px;
  color: #333;
  padding: 15px;
  @media ${(props) => props.theme.laptopM} {
    width: 45vw;
  }
  @media ${(props) => props.theme.tablet} {
    width: 95vw;
  }
  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    img {
      border: 1px solid #eee;
      border-radius: 50px;
      width: 45px;
      /* height: 55px; */
      background-image: url(${(props) => props.img});
      background-size: cover;
    }
    figcaption {
      margin-top: 10px;
    }
  }

  section:nth-of-type(2) {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    * {
      margin-bottom: 5px;
    }
    summary {
      font-size: 20px;
      font-weight: 600;
      /* height: 25px; */
    }
    article {
      text-align: left;
      color: gray;
    }
  }
`;
