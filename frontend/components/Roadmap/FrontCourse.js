import Link from 'next/link';
import styled from 'styled-components';

const FrontCourse = () => {
  return (
    <Course>
      <li>
        <Link href="/video/213">
          <span>[생활코딩 - HTML]</span>
        </Link>
      </li>
      <li>
        <Link href="/video/1094">
          <span>
            [테크보이 워니 - 코딩 기초 없이 웹사이트 따라 만들기(HTML, CSS)
          </span>
        </Link>
      </li>
      <li>
        <Link href="/video/1044">
          <span>[김버그 - 3년차 개발자의 프론트엔드 개발 공부 후기]</span>
        </Link>
      </li>
      <li>
        <Link href="/video/1095">
          <span>[엘리 - 자바스크립트 기초 강의(ES5+]</span>
        </Link>
      </li>
    </Course>
  );
};

export default FrontCourse;

const Course = styled.div`
  /* border: 1px solid orange; */
  padding: 5px;
  display: flex;
  flex-direction: column;
  animation: appear 0.5s ease-in-out;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  li {
    margin: 10px 0;
    cursor: pointer;
    span {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 20px;
        width: 100%;
        border-bottom: 2px solid #0055b8;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.6s, transform 0.6s;
        -webkit-transform: scale(0, 1);
        transform: scale(0, 1);
      }
      &:hover:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      &:hover {
        color: #0055b8;
        transition: color 0.2s ease-in-out;
      }
    }
  }
`;
